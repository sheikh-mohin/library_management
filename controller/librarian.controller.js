const argon2 = require("argon2");
const librarianSchema = require("../schema/librarian.schema");
const { getJWTToken } = require("../security/jwt");
const { getAge } = require("../utils/utils");
const { status, message } = require("../validator/utils");
const { getResponseStructure } = require("../constants/response.structure");

exports.create = async (req, res) => {
  try {
    const librarian = new librarianSchema({
      name: req.body.name,
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      mobileNumber: "+91" + req.body.mobileNumber,
      gender: req.body.gender,
      dob: req.body.dob,
      age: getAge(req.body.dob),
    });
    const findLibrarian = await librarianSchema.find({
      $or: [{ email: librarian["email"] }, { mobileNumber: librarian["mobileNumber"] }],
    });
    if (findLibrarian["length"] !== 0) {
      return res
        .status(status.conflict)
        .send(
          getResponseStructure(status.conflict, "Librarian" + message.alreadyExist)
        );
    }
    await librarian.save()
      .then(() => {
        return res
          .status(status.successCreated)
          .send(
            getResponseStructure(
              status.successCreated,
              "Librarian" + message.successCreated
            )
          );
      })
      .catch(() => {
        return res
          .status(status.badRequest)
          .send(getResponseStructure(status.badRequest, message.badRequest));
      });
  } catch (error) {
    return res
      .status(status.success)
      .send(getResponseStructure(status.notfound, error.toString()));
  }
};

exports.login = async (req, res) => {
  try {
    let librarian = await librarianSchema.aggregate([
      {
        $match: {
          $or: [
            { email: req.body.email },
            { mobileNumber: "+91" + req.body.mobileNumber },
          ],
          isDeleted: false,
        },
      },
    ]);
    librarian = librarian[0];
    if (!librarian) {
      return res
        .status(status.success)
        .send(getResponseStructure(status.notfound, "Librarian" + message.notFound));
    }
    if (await argon2.verify(librarian["password"], req.body.password)) {
      const generateToken = await getJWTToken({ librarian }); // Generating Token.
      return res
        .status(status.success)
        .send(
          getResponseStructure(
            status.success,
            "Librarian" + message.tokenGenerateSuccess,
            { token: generateToken }
          )
        );
    }
    return res
      .status(status.success)
      .send(status.notfound, message.notMatchPassword);
  } catch (error) {
    return res
      .status(status.success)
      .send(getResponseStructure(status.notfound, error.toString()));
  }
};
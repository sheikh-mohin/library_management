# _API Index_

- [01. Librarian Register](#01-librarian-register)
- [02. Login](#02-login)

# _API End Point_

**Route**: `http://localhost:3000/api/v1`

# _Postman Collection_

```
https://www.getpostman.com/collections/a6182bf232a37d783100
```

# _Environments Variable for Postman_

(**Note** : _**Set this Environments Variable to your postman**_)

**url** => `http://localhost:3000/api/v1`

**token** => `"...Your Token"`

# _API Reference_

## 01. Librarian Register

**Route:**
`/librarian/register`

**Method:**
`POST`

**Request payload:**

```json
{
  "name": "Mohin",
  "email": "mohinsheikh2011@gmail.com",
  "password": "user123",
  "confirmPass": "user123",
  "gender": "male",
  "mobileNumber": "8830186746",
  "dob": "2000-05-25"
}
```

- `password` is required.
- `email` `mobile_number` and `age` is required.

**Sample response:**

```json
{
  "status": 201,
  "message": "Librarian created Successfully.",
  "response": {}
}
```

## 02. Login

**Route:**
`/librarian/login`

**Method:**
`POST`

**Request payload:**

```json
{
  "email": "mohinsheikh2011@gmail.com",
  "password": "user123"
}
```

- `email`, and `password` is required.

**Sample response:**

```json
{
  "status": 200,
  "message": "Librarian Token Generated Successfully.",
  "response": {
    "token": "eyJhbGctQ......AEVZc9cVqqw"
  }
}
```

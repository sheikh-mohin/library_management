# _API Index_

- [01. Issue Request Register](#01-issue-request-register)

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

## 01. Issue Request Register

**Route:**
`/book/request/register`

**Method:**
`POST`

**Request payload:**

```json
{
  "issueTo": "USER",
  "bookId": "63343f915acda4b27bf69d4c",
  "issueDate": "2022-05-25"
}
```

- `issueTo` is required.
- `bookId` and `issueDate` is required.

**Sample response:**

```json
{
  "status": 201,
  "message": "Book Issue Request created Successfully.",
  "response": {}
}
```
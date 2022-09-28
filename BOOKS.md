# _API Index_

- [01. Books Register [auth]](#01-books-register-auth)
- [02. Fetch Single Book [auth]](#02-fetch-single-book-auth)
- [03. Fetch All Book [auth]](#03-fetch-all-book-auth)
- [04. Modify Books [auth]](#04-modify-books-auth)
- [05. Remove Books [auth]](#05-remove-books-auth)

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

## 01. Books Register [auth]

**Route:**
`/book/register`

**Method:**
`POST`

**Request payload:**

```json
{
  "book_name": "In Search of Lost Time",
  "title": "In Search of Lost Time by Marcel Proust",
  "publisher": "Marcel Proust",
  "author": "Swan's Way",
  "quantity": 250,
  "price": 1500.30,
  "issueDate": "2022-05-25"
}
```

- All Fields is required.

**Sample response:**

```json
{
  "status": 201,
  "message": "Book created Successfully.",
  "response": {}
}
```

## 02. Fetch Single Book [auth]

**Route:**
`/book/fetch/:id`

**Method:**
`GET`

**Request payload:**

> Query Params: `http://localhost:3000/api/v1/book/fetch/63346ebe350a3a255e9a5362`

- `ID` is required.

**Sample response:**

```json
{
  "status": 200,
  "message": "Books fetch Successfully",
  "response": {
    "_id": "63346ebe350a3a255e9a5362",
    "book_name": "in search of lost time",
    "title": "in search of lost time by marcel proust",
    "publisher": "marcel proust",
    "author": "swann's way",
    "issueDate": "2022-05-25T00:00:00.000Z",
    "quantity": 250,
    "numberOfIssue": 0,
    "price": 1500.3
  }
}
```

## 03. Fetch All Book [auth]

**Route:**
`/book/fetch`

**Method:**
`GET`

**Request payload:**

> Query Params: `page = 1`

- `ID` is required.

**Sample response:**

```json
{
  "status": 200,
  "message": "Books fetch Successfully",
  "response": {
    "Books": [
      {
        "_id": "63346ebe350a3a255e9a5362",
        "book_name": "in search of lost time",
        "title": "in search of lost time by marcel proust",
        "publisher": "marcel proust",
        "author": "swann's way",
        "issueDate": "2022-05-25T00:00:00.000Z",
        "quantity": 250,
        "numberOfIssue": 0,
        "price": 1500.3
      }
    ],
    "Total_books": 1,
    "Total_quantity": 250,
    "Page": 1,
    "Next_page": 1,
    "Total_pages": 1
  }
}
```


## 04. Modify Books [auth]

**Route:**
`/book/modify`

**Method:**
`PATCH`

**Request payload:**

```json
{
  "id": "63346ebe350a3a255e9a5362",
  "book_name": "One Hundred Years of Solitude",
  "title": "One Hundred Years of Solitude by Gabriel Garcia Marquez",
  "publisher": "Garcia Marquez"
}
```
- `ID` is required.

**Sample response:**

```json
{
  "status": 200,
  "message": "Success",
  "response": {}
}
```


## 05. Remove Books [auth]

**Route:**
`/book/remove`

**Method:**
`DELETE`

**Request payload:**

> Query Params: `http://localhost:3000/api/v1/book/remove?id=63346ebe350a3a255e9a5362`

- `ID` is required.

**Sample response:**

```json
{
  "status": 200,
  "message": "Success",
  "response": {}
}
```

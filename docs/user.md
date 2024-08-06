# User API Spec
## Register User
Endpoint: POST /api/users

Request Body:

```json
  {
    "username": "john",
    "password": "supersecretpassword",
    "name": "John Doe"
  }
```

Response Body (Success):

```json
  {
    "data": {
      "username": "john",
      "name": "John Doe"
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Username is required, ..."
  }
```

## Login User
Endpoint: POST /api/users/login

Request Body:

```json
  {
    "username": "john",
    "password": "supersecretpassword",
  }
```

Response Body (Success):

```json
  {
    "data": {
      "username": "john",
      "name": "John Doe",
      "token": "uuid"
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Username or password wrong, ..."
  }
```

## Get User
Endpoint: GET /api/users/current

Request Header:
  - X-API-TOKEN: token

Response Body (Success):

```json
  {
    "data": {
      "username": "john",
      "name": "John Doe",
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Unauthorized, ..."
  }
```
## Update User
Endpoint: PATCH /api/users/current

Request Header:
  - X-API-TOKEN: token

Request Body:

```json
  {
    "username": "john", // optional
    "name": "John Doe", // optional
    "password": "supersecretpassword" // optional
  }
```

Response Body (Success):

```json
  {
    "data": {
      "username": "john",
      "name": "John Doe",
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Unauthorized, ..."
  }
```

## Logout User
Endpoint: DELETE /api/users/current

Request Header:
  - X-API-TOKEN: token

Response Body (Success):

```json
  {
    "data": "OK"
  }
```

Response Body (Failed):

```json
  {
    "errors": "Unauthorized, ..."
  }
```
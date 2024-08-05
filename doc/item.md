# Item API Spec
## Create Item
Endpoint: POST /api/items

Request Header:
  - X-API-TOKEN: token

Request Body:

```json
  {
    "name": "pen gift from ex",
    "description": "this pen is very precious to me, blue color with a little bit of correction pen mark on the top", // optional
    "locationId": 2, 
  }
```

Response Body (Success):

```json
  {
    "data": {
      "id": 1,
      "name": "pen gift from ex",
      "description": "this pen is very precious to me, blue color with a little bit of correction pen mark on the top",
      "locationId": 2, 
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Name is required, ..."
  }
```

## Get Items
Endpoint: POST /api/items

Query Parameter:

  - name: string
  - page: number, default 1
  - size: number, default 10

Request Header:
  - X-API-TOKEN: token

Response Body (Success):

```json
  {
    "data": [
      {
        "id": 1,
        "name": "pen gift from ex",
        "description": "this pen is very precious to me, blue color with a little bit of correction pen mark on the top",
        "locationId": 2, 
      },
      {
        "id": 2,
        "name": "car key",
        "description": "a lamborghini key",
        "locationId": 3, 
      },
    ],
    "paging" : {
      "current_page" : 1,
      "total_page" : 10,
      "size" : 10
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Unauthorized, ..."
  }
```

## Get Item by ID
Endpoint: GET /api/items/:id

Request Header:
  - X-API-TOKEN: token

Response Body (Success):

```json
  {
    "data": {
      "id": 1,
      "name": "pen gift from ex",
      "description": "this pen is very precious to me, blue color with a little bit of correction pen mark on the top",
      "locationId": 2, 
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "item not found, ..."
  }
```
## Update Item
Endpoint: PUT /api/items/:id

Request Header:
  - X-API-TOKEN: token

Request Body:

```json
  {
    "name": "new pen gift from ex",
    "description": "new this pen is very precious to me, blue color with a little bit of correction pen mark on the top", // optional
    "locationId": 2, 
  }
```

Response Body (Success):

```json
  {
    "data": {
      "id": 1,
      "name": "new pen gift from ex",
      "description": "new this pen is very precious to me, blue color with a little bit of correction pen mark on the top",
      "locationId": 2, 
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Name is required, ..."
  }
```

## Delete Item
Endpoint: DELETE /api/items/:id

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
    "errors": "Item not found, ..."
  }
```
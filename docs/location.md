# Location API Spec
## Create Location
Endpoint: POST /api/locations

Request Body:

```json
  {
    "name": "on top of the wardrobe",
    "description": "watch out when grabbing things from here, cause if they drop back there, it will pain to get them." // optional
  }
```

Response Body (Success):

```json
  {
    "data": {
      "id": 1,
      "name": "on top of the wardrobe",
      "description": "watch out when grabbing things from here, cause if they drop back there, it will pain to get them."
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Name is required, ..."
  }
```

## Get Locations
Endpoint: POST /api/locations

Query Parameter :

  - name: string, optional
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
        "name": "on top of the wardrobe",
        "description": "watch out when grabbing things from here, cause if they drop back there, it will pain to get them."
      },
    ],
    "paging": {
      "current_page": 1,
      "total_page": 10,
      "size": 10
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Unauthorized, ..."
  }
```

## Get Location
Endpoint: GET /api/locations/:id

Request Header:
  - X-API-TOKEN: token

Response Body (Success):

```json
  {
    "data": {
        "id": 1,
        "name": "on top of the wardrobe",
        "description": "watch out when grabbing things from here, cause if they drop back there, it will pain to get them."
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Location not found, ..."
  }
```

## Update Location
Endpoint: PUT /api/locations/:id

Request Header:
  - X-API-TOKEN: token

Request Body:

```json
  {
    "name": "new on top of the wardrobe",
    "description": "new watch out when grabbing things from here, cause if they drop back there, it will pain to get them." // optional
  }
```

Response Body (Success):

```json
  {
    "data": {
      "id": 1, 
      "name": "on top of the wardrobe",
      "description": "watch out when grabbing things from here, cause if they drop back there, it will pain to get them."
    }
  }
```

Response Body (Failed):

```json
  {
    "errors": "Name is required, ..."
  }
```

## Delete Location
Endpoint: DELETE /api/locations/:id

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
    "errors": "Location is not found, ..."
  }
```
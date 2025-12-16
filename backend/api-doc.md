# API GENERAL RESPONSE

## 1. GET DATA PRODUCT
### GET /api/v1/json-properties?mitra=CNET&product=PLN20

#### Response:
```json
{
    "status": true,
    "response_code": "000000",
    "response": "success",
    "data": {
        "id": 1,
        "json": "{\"produk\":true,\"token\":true,\"nama\":true,\"time\":true}",
        "mitra_id": "CNET",
        "product_code": "PLN20",
        "status": 1,
        "created_at": "22-04-04 12:00:00.000",
        "updated_at": "0022-04-04T04:02:24.000Z"
    }
}
```

## 2. CREATE DATA PRODUCT
### POST /api/v1/json-properties

#### Request:
```json
{
    "json": "{\"produk\":true,\"token\":true,\"nama\":true,\"time\":true}",
    "mitra_id": "CNET",
    "product_code": "PLN15",
    "status": 1
}
```

#### Response:
```json
{
    "status": true,
    "response_code": "000000",
    "response": "created success!",
    "data": null
}
```

## 3. UPDATE DATA PRODUCT
### PUT /api/v1/json-properties/3

#### Request:
```json
{
    "json": "{\"produk\":true,\"token\":true,\"nama\":true,\"time\":true}",
    "mitra_id": "CNET",
    "product_code": "PLN10",
    "status": 0
}
```

#### Response:
```json
{
    "status": true,
    "response_code": "000000",
    "response_text": "update success!",
    "data": null
}
```

## 4. DELETE DATA PRODUCT
### DELETE /api/v1/json-properties/3

#### Response:
```json
{
    "status": true,
    "response_code": "000000",
    "response": "delete success!",
    "data": null
}
```
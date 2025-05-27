# FITHSCS Logistics Application - Pickup API Documentation

This document provides details about the mock API endpoints for the ePickup Module of the FITHSCS Logistics Application.

## Base URL

For local development: `http://localhost:3000`

## Authentication

This mock API doesn't implement authentication. In production, endpoints would require proper authentication tokens.

## API Endpoints

### Health Facilities

#### Get All Health Facilities
```
GET /api/health-facilities
```

Response:
```json
[
  {
    "id": "HF001",
    "name": "Tikur Anbessa Specialized Hospital",
    "location": {
      "latitude": 9.0106,
      "longitude": 38.7780,
      "geofenceRadius": 100
    },
    "address": "Addis Ababa, Ethiopia"
  },
  ...
]
```

#### Get Health Facility by ID
```
GET /api/health-facilities/:id
```

Response:
```json
{
  "id": "HF001",
  "name": "Tikur Anbessa Specialized Hospital",
  "location": {
    "latitude": 9.0106,
    "longitude": 38.7780,
    "geofenceRadius": 100
  },
  "address": "Addis Ababa, Ethiopia"
}
```

### Packages

#### Get All Packages
```
GET /api/packages
```

Response:
```json
[
  {
    "qrCode": "QR123456",
    "customerId": "HF001",
    "customerName": "Tikur Anbessa Specialized Hospital",
    "deliveryNumber": "DEL-2025-0421",
    "orderNumber": "ORD-2025-1234",
    "status": "pending",
    "items": [
      { "name": "Amoxicillin 500mg", "quantity": 500, "unit": "boxes" },
      { "name": "Paracetamol 500mg", "quantity": 300, "unit": "boxes" }
    ]
  },
  ...
]
```

#### Get Package by QR Code
```
GET /api/packages/:qrCode
```

Response:
```json
{
  "qrCode": "QR123456",
  "customerId": "HF001",
  "customerName": "Tikur Anbessa Specialized Hospital",
  "deliveryNumber": "DEL-2025-0421",
  "orderNumber": "ORD-2025-1234",
  "status": "pending",
  "items": [
    { "name": "Amoxicillin 500mg", "quantity": 500, "unit": "boxes" },
    { "name": "Paracetamol 500mg", "quantity": 300, "unit": "boxes" }
  ]
}
```

#### Get Packages by Customer ID
```
GET /api/customers/:customerId/packages
```

Response:
```json
[
  {
    "qrCode": "QR123456",
    "customerId": "HF001",
    "customerName": "Tikur Anbessa Specialized Hospital",
    "deliveryNumber": "DEL-2025-0421",
    "orderNumber": "ORD-2025-1234",
    "status": "pending",
    "items": [
      { "name": "Amoxicillin 500mg", "quantity": 500, "unit": "boxes" },
      { "name": "Paracetamol 500mg", "quantity": 300, "unit": "boxes" }
    ]
  },
  ...
]
```

### Drivers

#### Get All Drivers
```
GET /api/drivers
```

Response:
```json
[
  {
    "id": "DRV001",
    "name": "Abebe Kebede",
    "phone": "+251911234567",
    "vehicleId": "VEH001",
    "vehiclePlate": "AA-12345"
  },
  ...
]
```

### Pickups

#### Register a Pickup
```
POST /api/pickups
```

Request Body:
```json
{
  "qrCode": "QR123456",
  "driverId": "DRV001",
  "pickupLocation": {
    "latitude": 9.0106,
    "longitude": 38.7780
  },
  "pickupTimestamp": "2025-04-29T10:15:30Z",
  "storeManagerSignature": "base64encodedSignatureData",
  "driverSignature": "base64encodedSignatureData",
  "notes": "All packages received in good condition"
}
```

Response:
```json
{
  "id": "PU-1714422530000",
  "qrCode": "QR123456",
  "package": {
    "qrCode": "QR123456",
    "customerId": "HF001",
    "customerName": "Tikur Anbessa Specialized Hospital",
    "deliveryNumber": "DEL-2025-0421",
    "orderNumber": "ORD-2025-1234",
    "status": "picked_up",
    "items": [
      { "name": "Amoxicillin 500mg", "quantity": 500, "unit": "boxes" },
      { "name": "Paracetamol 500mg", "quantity": 300, "unit": "boxes" }
    ]
  },
  "driverId": "DRV001",
  "driver": {
    "id": "DRV001",
    "name": "Abebe Kebede",
    "phone": "+251911234567",
    "vehicleId": "VEH001",
    "vehiclePlate": "AA-12345"
  },
  "pickupLocation": {
    "latitude": 9.0106,
    "longitude": 38.7780
  },
  "pickupTimestamp": "2025-04-29T10:15:30Z",
  "storeManagerSignature": "base64encodedSignatureData",
  "driverSignature": "base64encodedSignatureData",
  "notes": "All packages received in good condition",
  "createdAt": "2025-04-29T10:15:30.000Z"
}
```

Possible error responses:
```json
{ "error": "Invalid QR code" }
{ "error": "Invalid driver ID" }
{ "error": "Package already picked up" }
{ 
  "error": "Pickup location outside geofence",
  "distance": 150,
  "geofenceRadius": 100,
  "outsideGeofence": true
}
```

#### Get All Pickups
```
GET /api/pickups
```

Response:
```json
[
  {
    "id": "PU-1714422530000",
    "qrCode": "QR123456",
    "package": { ... },
    "driverId": "DRV001",
    "driver": { ... },
    "pickupLocation": {
      "latitude": 9.0106,
      "longitude": 38.7780
    },
    "pickupTimestamp": "2025-04-29T10:15:30Z",
    "storeManagerSignature": "base64encodedSignatureData",
    "driverSignature": "base64encodedSignatureData",
    "notes": "All packages received in good condition",
    "createdAt": "2025-04-29T10:15:30.000Z"
  },
  ...
]
```

#### Get Pickup by ID
```
GET /api/pickups/:id
```

Response:
```json
{
  "id": "PU-1714422530000",
  "qrCode": "QR123456",
  "package": { ... },
  "driverId": "DRV001",
  "driver": { ... },
  "pickupLocation": {
    "latitude": 9.0106,
    "longitude": 38.7780
  },
  "pickupTimestamp": "2025-04-29T10:15:30Z",
  "storeManagerSignature": "base64encodedSignatureData",
  "driverSignature": "base64encodedSignatureData",
  "notes": "All packages received in good condition",
  "createdAt": "2025-04-29T10:15:30.000Z"
}
```

#### Get Pickups by Driver ID
```
GET /api/drivers/:driverId/pickups
```

Response:
```json
[
  {
    "id": "PU-1714422530000",
    "qrCode": "QR123456",
    "package": { ... },
    "driverId": "DRV001",
    "driver": { ... },
    "pickupLocation": {
      "latitude": 9.0106,
      "longitude": 38.7780
    },
    "pickupTimestamp": "2025-04-29T10:15:30Z",
    "storeManagerSignature": "base64encodedSignatureData",
    "driverSignature": "base64encodedSignatureData",
    "notes": "All packages received in good condition",
    "createdAt": "2025-04-29T10:15:30.000Z"
  },
  ...
]
```

## Error Handling

All API endpoints follow a consistent error format:

```json
{
  "error": "Error message description"
}
```

HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error
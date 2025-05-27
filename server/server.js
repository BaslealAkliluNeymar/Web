// Mock API for the ePickup Module of FITHSCS Logistics Application
// This file simulates a backend API with Express.js for quick frontend development

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));
app.use(bodyParser.json());

const healthFacilities = [
  {
    id: 'HF001',
    name: 'Tikur Anbessa Specialized Hospital',
    location: {
      latitude: 9.0106,
      longitude: 38.7780,
      geofenceRadius: 100 
    },
    address: 'Addis Ababa, Ethiopia'
  },
  {
    id: 'HF002',
    name: 'St. Paul\'s Hospital Millennium Medical College',
    location: {
      latitude: 9.0299,
      longitude: 38.7512,
      geofenceRadius: 100
    },
    address: 'Addis Ababa, Ethiopia'
  },
  {
    id: 'HF003',
    name: 'Yekatit 12 Hospital Medical College',
    location: {
      latitude: 9.0342,
      longitude: 38.7504,
      geofenceRadius: 100
    },
    address: 'Addis Ababa, Ethiopia'
  }
];

const packages = [
  {
    qrCode: 'QR123456',
    customerId: 'HF001',
    customerName: 'Tikur Anbessa Specialized Hospital',
    deliveryNumber: 'DEL-2025-0421',
    orderNumber: 'ORD-2025-1234',
    status: 'pending',
    items: [
      { name: 'Amoxicillin 500mg', quantity: 500, unit: 'boxes' },
      { name: 'Paracetamol 500mg', quantity: 300, unit: 'boxes' }
    ]
  },
  {
    qrCode: 'QR123457',
    customerId: 'HF001',
    customerName: 'Tikur Anbessa Specialized Hospital',
    deliveryNumber: 'DEL-2025-0422',
    orderNumber: 'ORD-2025-1235',
    status: 'pending',
    items: [
      { name: 'Metformin 500mg', quantity: 200, unit: 'boxes' },
      { name: 'Insulin', quantity: 50, unit: 'packs' }
    ]
  },
  {
    qrCode: 'QR123458',
    customerId: 'HF002',
    customerName: 'St. Paul\'s Hospital Millennium Medical College',
    deliveryNumber: 'DEL-2025-0423',
    orderNumber: 'ORD-2025-1236',
    status: 'pending',
    items: [
      { name: 'Ciprofloxacin 500mg', quantity: 100, unit: 'boxes' },
      { name: 'Doxycycline 100mg', quantity: 150, unit: 'boxes' }
    ]
  },
  {
    qrCode: 'QR123459',
    customerId: 'HF003',
    customerName: 'Yekatit 12 Hospital Medical College',
    deliveryNumber: 'DEL-2025-0424',
    orderNumber: 'ORD-2025-1237',
    status: 'pending',
    items: [
      { name: 'Azithromycin 250mg', quantity: 75, unit: 'boxes' },
      { name: 'Hydrocortisone cream', quantity: 100, unit: 'tubes' }
    ]
  }
];

const drivers = [
  {
    id: 'DRV001',
    name: 'Abebe Kebede',
    phone: '+251911234567',
    vehicleId: 'VEH001',
    vehiclePlate: 'AA-12345'
  },
  {
    id: 'DRV002',
    name: 'Meron Alemu',
    phone: '+251922345678',
    vehicleId: 'VEH002',
    vehiclePlate: 'AA-23456'
  }
];

const pickups = [
    {
        id: "PU-20250425001",
        qrCode: "QR123456",
        package: {
          qrCode: "QR123456",
          customerId: "HF001",
          customerName: "Tikur Anbessa Specialized Hospital",
          deliveryNumber: "DEL-2025-0421",
          orderNumber: "ORD-2025-1234",
          status: "picked_up",
          items: [
            { name: "Amoxicillin 500mg", quantity: 500, unit: "boxes" },
            { name: "Paracetamol 500mg", quantity: 300, unit: "boxes" }
          ]
        },
        driverId: "DRV001",
        driver: {
          id: "DRV001",
          name: "Abebe Kebede",
          phone: "+251911234567",
          vehicleId: "VEH001",
          vehiclePlate: "AA-12345"
        },
        pickupLocation: {
          latitude: 9.0106,
          longitude: 38.7781
        },
        pickupTimestamp: "2025-04-25T09:30:15Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "All packages received in good condition",
        createdAt: "2025-04-25T09:30:15.000Z"
      },
      {
        id: "PU-20250425002",
        qrCode: "QR123457",
        package: {
          qrCode: "QR123457",
          customerId: "HF001",
          customerName: "Tikur Anbessa Specialized Hospital",
          deliveryNumber: "DEL-2025-0422",
          orderNumber: "ORD-2025-1235",
          status: "picked_up",
          items: [
            { name: "Metformin 500mg", quantity: 200, unit: "boxes" },
            { name: "Insulin", quantity: 50, unit: "packs" }
          ]
        },
        driverId: "DRV001",
        driver: {
          id: "DRV001",
          name: "Abebe Kebede",
          phone: "+251911234567",
          vehicleId: "VEH001",
          vehiclePlate: "AA-12345"
        },
        pickupLocation: {
          latitude: 9.0106,
          longitude: 38.7780
        },
        pickupTimestamp: "2025-04-25T09:35:22Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "Insulin packs kept in temperature-controlled container",
        createdAt: "2025-04-25T09:35:22.000Z"
      },
      {
        id: "PU-20250426001",
        qrCode: "QR123458",
        package: {
          qrCode: "QR123458",
          customerId: "HF002",
          customerName: "St. Paul's Hospital Millennium Medical College",
          deliveryNumber: "DEL-2025-0423",
          orderNumber: "ORD-2025-1236",
          status: "picked_up",
          items: [
            { name: "Ciprofloxacin 500mg", quantity: 100, unit: "boxes" },
            { name: "Doxycycline 100mg", quantity: 150, unit: "boxes" }
          ]
        },
        driverId: "DRV002",
        driver: {
          id: "DRV002",
          name: "Meron Alemu",
          phone: "+251922345678",
          vehicleId: "VEH002",
          vehiclePlate: "AA-23456"
        },
        pickupLocation: {
          latitude: 9.0299,
          longitude: 38.7512
        },
        pickupTimestamp: "2025-04-26T11:15:40Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "Packages sealed properly",
        createdAt: "2025-04-26T11:15:40.000Z"
      },
      {
        id: "PU-20250427001",
        qrCode: "QR123459",
        package: {
          qrCode: "QR123459",
          customerId: "HF003",
          customerName: "Yekatit 12 Hospital Medical College",
          deliveryNumber: "DEL-2025-0424",
          orderNumber: "ORD-2025-1237",
          status: "picked_up",
          items: [
            { name: "Azithromycin 250mg", quantity: 75, unit: "boxes" },
            { name: "Hydrocortisone cream", quantity: 100, unit: "tubes" }
          ]
        },
        driverId: "DRV001",
        driver: {
          id: "DRV001",
          name: "Abebe Kebede",
          phone: "+251911234567",
          vehicleId: "VEH001",
          vehiclePlate: "AA-12345"
        },
        pickupLocation: {
          latitude: 9.0342,
          longitude: 38.7504
        },
        pickupTimestamp: "2025-04-27T14:05:12Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "Creams stored in separate container",
        createdAt: "2025-04-27T14:05:12.000Z"
      },
      {
        id: "PU-20250427002",
        qrCode: "QR123460",
        package: {
          qrCode: "QR123460",
          customerId: "HF002",
          customerName: "St. Paul's Hospital Millennium Medical College",
          deliveryNumber: "DEL-2025-0425",
          orderNumber: "ORD-2025-1238",
          status: "picked_up",
          items: [
            { name: "Omeprazole 20mg", quantity: 120, unit: "boxes" },
            { name: "Ranitidine 150mg", quantity: 80, unit: "boxes" }
          ]
        },
        driverId: "DRV002",
        driver: {
          id: "DRV002",
          name: "Meron Alemu",
          phone: "+251922345678",
          vehicleId: "VEH002",
          vehiclePlate: "AA-23456"
        },
        pickupLocation: {
          latitude: 9.0299,
          longitude: 38.7513
        },
        pickupTimestamp: "2025-04-27T15:40:22Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "One box of Omeprazole slightly damaged but contents intact",
        createdAt: "2025-04-27T15:40:22.000Z"
      },
      {
        id: "PU-20250428001",
        qrCode: "QR123461",
        package: {
          qrCode: "QR123461",
          customerId: "HF001",
          customerName: "Tikur Anbessa Specialized Hospital",
          deliveryNumber: "DEL-2025-0426",
          orderNumber: "ORD-2025-1239",
          status: "picked_up",
          items: [
            { name: "Atenolol 50mg", quantity: 150, unit: "boxes" },
            { name: "Lisinopril 10mg", quantity: 200, unit: "boxes" },
            { name: "Furosemide 40mg", quantity: 100, unit: "boxes" }
          ]
        },
        driverId: "DRV001",
        driver: {
          id: "DRV001",
          name: "Abebe Kebede",
          phone: "+251911234567",
          vehicleId: "VEH001",
          vehiclePlate: "AA-12345"
        },
        pickupLocation: {
          latitude: 9.0106,
          longitude: 38.7781
        },
        pickupTimestamp: "2025-04-28T08:15:30Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "All cartons properly sealed",
        createdAt: "2025-04-28T08:15:30.000Z"
      },
      {
        id: "PU-20250428002",
        qrCode: "QR123462",
        package: {
          qrCode: "QR123462",
          customerId: "HF003",
          customerName: "Yekatit 12 Hospital Medical College",
          deliveryNumber: "DEL-2025-0427",
          orderNumber: "ORD-2025-1240",
          status: "picked_up",
          items: [
            { name: "Vaccine Storage Containers", quantity: 10, unit: "units" },
            { name: "Cold Chain Equipment", quantity: 5, unit: "sets" }
          ]
        },
        driverId: "DRV002",
        driver: {
          id: "DRV002",
          name: "Meron Alemu",
          phone: "+251922345678",
          vehicleId: "VEH002",
          vehiclePlate: "AA-23456"
        },
        pickupLocation: {
          latitude: 9.0342,
          longitude: 38.7504
        },
        pickupTimestamp: "2025-04-28T10:20:45Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "Equipment checked and verified. Temperature monitors active.",
        createdAt: "2025-04-28T10:20:45.000Z"
      },
      {
        id: "PU-20250428003",
        qrCode: "QR123463",
        package: {
          qrCode: "QR123463",
          customerId: "HF001",
          customerName: "Tikur Anbessa Specialized Hospital",
          deliveryNumber: "DEL-2025-0428",
          orderNumber: "ORD-2025-1241",
          status: "picked_up",
          items: [
            { name: "Laboratory Reagents", quantity: 30, unit: "kits" },
            { name: "Diagnostic Test Strips", quantity: 500, unit: "packs" }
          ]
        },
        driverId: "DRV001",
        driver: {
          id: "DRV001",
          name: "Abebe Kebede",
          phone: "+251911234567",
          vehicleId: "VEH001",
          vehiclePlate: "AA-12345"
        },
        pickupLocation: {
          latitude: 9.0107,
          longitude: 38.7780
        },
        pickupTimestamp: "2025-04-28T13:40:10Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "Temperature-sensitive items packed in insulated containers",
        createdAt: "2025-04-28T13:40:10.000Z"
      },
      {
        id: "PU-20250429001",
        qrCode: "QR123464",
        package: {
          qrCode: "QR123464",
          customerId: "HF002",
          customerName: "St. Paul's Hospital Millennium Medical College",
          deliveryNumber: "DEL-2025-0429",
          orderNumber: "ORD-2025-1242",
          status: "picked_up",
          items: [
            { name: "Surgical Masks", quantity: 5000, unit: "pieces" },
            { name: "Surgical Gloves", quantity: 2000, unit: "pairs" },
            { name: "Face Shields", quantity: 200, unit: "pieces" }
          ]
        },
        driverId: "DRV002",
        driver: {
          id: "DRV002",
          name: "Meron Alemu",
          phone: "+251922345678",
          vehicleId: "VEH002",
          vehiclePlate: "AA-23456"
        },
        pickupLocation: {
          latitude: 9.0299,
          longitude: 38.7512
        },
        pickupTimestamp: "2025-04-29T08:05:30Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "PPE items sealed in protective packaging",
        createdAt: "2025-04-29T08:05:30.000Z"
      },
      {
        id: "PU-20250429002",
        qrCode: "QR123465",
        package: {
          qrCode: "QR123465",
          customerId: "HF003",
          customerName: "Yekatit 12 Hospital Medical College",
          deliveryNumber: "DEL-2025-0430",
          orderNumber: "ORD-2025-1243",
          status: "picked_up",
          items: [
            { name: "Ceftriaxone 1g", quantity: 100, unit: "vials" },
            { name: "IV Solution NaCl 0.9%", quantity: 200, unit: "bags" }
          ]
        },
        driverId: "DRV001",
        driver: {
          id: "DRV001",
          name: "Abebe Kebede",
          phone: "+251911234567",
          vehicleId: "VEH001",
          vehiclePlate: "AA-12345"
        },
        pickupLocation: {
          latitude: 9.0342,
          longitude: 38.7504
        },
        pickupTimestamp: "2025-04-29T09:30:15Z",
        storeManagerSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        driverSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFBAGA1A2T1QAAAABJRU5ErkJggg==",
        notes: "Properly packed and secured",
        createdAt: "2025-04-29T09:30:15.000Z"
      }
];

// API Endpoints
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, 10, {
//     expiresIn: "15m", // access token
//   });
// };

// export const login = (req, res) => {
//   const { email, password } = req.body;

//   // Validate user (mocked)
//   const user = { id: "user123", email };

//   const token = generateToken(user.id);

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: "prodcution",
//     sameSite: "strict",
//     maxAge: 15 * 60 * 1000, // 15 min
//   });

//   res.json({ message: "Logged in" });
// };
// Get all health facilities
app.get('/api/health-facilities', (req, res) => {
  res.json(healthFacilities);
});

// Get health facility by ID
app.get('/api/health-facilities/:id', (req, res) => {
  const facility = healthFacilities.find(f => f.id === req.params.id);
  if (facility) {
    res.json(facility);
  } else {
    res.status(404).json({ error: 'Health facility not found' });
  }
});

// Get all packages
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// Get package by QR code
app.get('/api/packages/:qrCode', (req, res) => {
  const package = packages.find(p => p.qrCode === req.params.qrCode);
  if (package) {
    res.json(package);
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
});

// Get packages by customer ID
app.get('/api/customers/:customerId/packages', (req, res) => {
  const customerPackages = packages.filter(p => p.customerId === req.params.customerId);
  res.json(customerPackages);
});

// Get all drivers
app.get('/api/drivers', (req, res) => {
  res.json(drivers);
});

// Register a pickup
app.post('/api/pickups', (req, res) => {
  try {
    const {
      qrCode,
      driverId,
      pickupLocation,
      pickupTimestamp,
      storeManagerSignature,
      driverSignature,
      notes
    } = req.body;

    // Validate QR code
    const package = packages.find(p => p.qrCode === qrCode);
    if (!package) {
      return res.status(404).json({ error: 'Invalid QR code' });
    }

    // Validate driver
    const driver = drivers.find(d => d.id === driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Invalid driver ID' });
    }

    // Check if package is already picked up
    if (package.status !== 'pending') {
      return res.status(400).json({ error: 'Package already picked up' });
    }

    // Validate geofence (simple distance calculation)
    const facility = healthFacilities.find(f => f.id === package.customerId);
    if (facility) {
      const distance = calculateDistance(
        facility.location.latitude,
        facility.location.longitude,
        pickupLocation.latitude,
        pickupLocation.longitude
      );
      
      if (distance > facility.location.geofenceRadius) {
        return res.status(400).json({ 
          error: 'Pickup location outside geofence',
          distance: distance,
          geofenceRadius: facility.location.geofenceRadius,
          outsideGeofence: true
        });
      }
    }

    // Update package status
    package.status = 'picked_up';

    // Create pickup record
    const pickup = {
      id: `PU-${Date.now()}`,
      qrCode,
      package,
      driverId,
      driver,
      pickupLocation,
      pickupTimestamp,
      storeManagerSignature,
      driverSignature,
      notes,
      createdAt: new Date().toISOString()
    };

    pickups.push(pickup);
    res.status(201).json(pickup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const vehicles = [
  {
    vehicle_id: "veh_001",
    plate_number: "ABC-1234",
    vehicle_type: "Truck",
    weight_capacity: 8000,
    volume_capacity: 40,
    current_status: "active",
    createed_at: "2025-01-10T08:30:00Z",
    updated_at: "2025-04-25T10:45:00Z"
  },
  {
    vehicle_id: "veh_002",
    plate_number: "XYZ-5678",
    vehicle_type: "Van",
    weight_capacity: 3000,
    volume_capacity: 15,
    current_status: "maintenance",
    createed_at: "2024-12-20T12:00:00Z",
    updated_at: "2025-03-10T09:15:00Z"
  },
  {
    vehicle_id: "veh_003",
    plate_number: "LMN-4321",
    vehicle_type: "Pickup",
    weight_capacity: 2000,
    volume_capacity: 10,
    current_status: "inactive",
    createed_at: "2024-11-01T07:20:00Z",
    updated_at: "2025-04-01T14:00:00Z"
  },
  {
    vehicle_id: "veh_004",
    plate_number: "GHJ-8765",
    vehicle_type: "Trailer",
    weight_capacity: 15000,
    volume_capacity: 60,
    current_status: "active",
    createed_at: "2025-02-14T11:45:00Z",
    updated_at: "2025-04-28T16:30:00Z"
  },
  {
    vehicle_id: "veh_005",
    plate_number: "TUV-9012",
    vehicle_type: "Box Truck",
    weight_capacity: 5000,
    volume_capacity: 25,
    current_status: "maintenance",
    createed_at: "2025-03-05T09:10:00Z",
    updated_at: "2025-04-15T13:50:00Z"
  }
];

//Get all Vehicles

app.get('/api/vehicles',(req,res) =>{
  res.send(vehicles)
})

app.post('/api/vehicles',(req,res) =>{
  try{

    const {vehicle_id, plate_number, vehicle_type, weight_capacity, volume_capacity, current_status} = req.body
    const newVehicle = {
      vehicle_id,
      plate_number,
      vehicle_type,
      weight_capacity,
      volume_capacity,
      current_status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    vehicles.push(newVehicle)
    res.status(201).json(newVehicle)
    
  }catch(error){
    res.status(500).json({
      message:'Unable to save Vehicle'
    })
  }
})

// Get all pickups
app.get('/api/pickups', (req, res) => {
  res.json(pickups);
});

// Get pickup by ID
app.get('/api/pickups/:id', (req, res) => {
  const pickup = pickups.find(p => p.id === req.params.id);
  if (pickup) {
    res.json(pickup);
  } else {
    res.status(404).json({ error: 'Pickup not found' });
  }
});

// Get pickups by driver ID
app.get('/api/drivers/:driverId/pickups', (req, res) => {
  const driverPickups = pickups.filter(p => p.driverId === req.params.driverId);
  res.json(driverPickups);
});

// Helper function to calculate distance between two coordinates (in meters)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}


app.get('/api/user',(req,res) =>{
  const role = {
    id:"user123",
    user:"basleal",
    role: "admin",
    permissions: [
      {
        feature:'Pickup',
        read:false,
        write:false,
        update:true,
        delete:false,
        view:true
      },
      {
        feature:'Factility',
        read:true,
        write:false,
        update:true,
        delete:false,
        view:true
      },
      {
        feature:'Delivery',
        read:true,
        write:false,
        update:true,
        delete:false,
        view:true
      },
      {
        feature:'Vehicle',
        read:true,
        write:true,
        update:false,
        delete:false,
        view:true
      }
    ]
  }
  res.json(role)
})



//Auth
const generateToken = (userId) => {
  return jwt.sign({ id: userId },"10", {
    expiresIn: "15m",
  });
};


app.post('/api/login',(req, res) => {
  const { email, password } = req.body;


  const user = { id: "user123", email };

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, 
  });

  res.json({ 
    message: "Logged in",
    role:'admin',
    permissions: [
      {
        feature:'Pickup',
        read:false,
        write:false,
        update:true,
        delete:false
      },
      {
        feature:'Factility',
        read:true,
        write:false,
        update:true,
        delete:false
      },
      {
        feature:'Delivery',
        read:true,
        write:true,
        update:true,
        delete:false
        
      },
      {
        feature:'Vehicle',
        read:true,
        write:true,
        update:true,
        delete:false,
        view:true
      }
    ],
    ...user
  });
});


app.post('/api/logout',(req,res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });
  res.status(200).send('Logged out');
})

app.listen(port, () => {
  console.log(`Pickup Mock API running at http://localhost:${port}`);
});



module.exports = app;
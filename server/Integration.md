# FITHSCS Logistics Application - Pickup API Integration Guide

This guide will help you integrate the mock pickup API with your user interface for the FITHSCS Logistics Application.

## Setup Instructions

### 1. Install Dependencies

First, you'll need to install the necessary dependencies to run the mock API server:

```bash
# Create a new directory for the mock API
mkdir fithscs-mock-api
cd fithscs-mock-api

# Initialize a new npm project
npm init -y

# Install dependencies
npm install express cors body-parser
```

### 2. Save the API Code

Copy the code from the "Pickup Mock API" artifact into a file named `server.js` in your project directory.

### 3. Run the Server

Start the server by running:

```bash
node server.js
```

You should see the message: `Pickup Mock API running at http://localhost:3000`

## Integration with Frontend

### Using Fetch API

Here's how to use the Fetch API to make requests to the mock API:

#### Example: Scan QR Code and Validate Package

```javascript
async function scanQRCode(qrCode) {
  try {
    const response = await fetch(`http://localhost:3000/api/packages/${qrCode}`);
    
    if (!response.ok) {
      // Handle error
      const error = await response.json();
      throw new Error(error.error || 'Failed to validate QR code');
    }
    
    const packageData = await response.json();
    return packageData;
  } catch (error) {
    console.error('Error scanning QR code:', error);
    throw error;
  }
}
```

#### Example: Register a Pickup

```javascript
async function registerPickup(pickupData) {
  try {
    const response = await fetch('http://localhost:3000/api/pickups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pickupData),
    });
    
    if (!response.ok) {
      // Handle error
      const error = await response.json();
      
      // Special handling for geofence errors
      if (error.outsideGeofence) {
        return {
          success: false,
          outsideGeofence: true,
          distance: error.distance,
          geofenceRadius: error.geofenceRadius,
          message: error.error
        };
      }
      
      throw new Error(error.error || 'Failed to register pickup');
    }
    
    const result = await response.json();
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error registering pickup:', error);
    throw error;
  }
}
```

### Using Axios

If you prefer using Axios, first install it:

```bash
npm install axios
```

Then use it in your code:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get package by QR code
export const getPackageByQRCode = async (qrCode) => {
  try {
    const response = await api.get(`/packages/${qrCode}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Register a pickup
export const registerPickup = async (pickupData) => {
  try {
    const response = await api.post('/pickups', pickupData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    const errorData = error.response?.data;
    
    // Special handling for geofence errors
    if (errorData?.outsideGeofence) {
      return {
        success: false,
        outsideGeofence: true,
        distance: errorData.distance,
        geofenceRadius: errorData.geofenceRadius,
        message: errorData.error
      };
    }
    
    throw errorData || error;
  }
};

// Get all health facilities
export const getAllHealthFacilities = async () => {
  try {
    const response = await api.get('/health-facilities');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all drivers
export const getAllDrivers = async () => {
  try {
    const response = await api.get('/drivers');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
```

## Workflow Integration

Here's a typical workflow for using the API in your ePickup module UI:

1. **Load Initial Data**
   - Load list of health facilities and drivers when the application starts
   - This data can be stored in local state or context for easy access

2. **QR Code Scanning**
   - When a QR code is scanned, call the API to validate and get package details
   - Display package information to the user

3. **Location Validation**
   - Get current location from the device's GPS
   - Check if the current location is within the geofence of the health facility
   - Warn the user if outside the geofence but allow proceeding

4. **Signature Collection**
   - Collect signatures from both the driver and the store manager
   - Convert signature data to base64 strings for transmission

5. **Submit Pickup**
   - Gather all required data and submit the pickup
   - Handle success and error responses appropriately
   - Update UI to reflect the new status

## Offline Support

To handle offline scenarios, you can:

1. **Cache API responses** using localStorage, IndexedDB, or a service worker
2. **Queue pickup requests** when offline and sync when back online
3. **Implement retry logic** for failed API calls

Here's a simple example of offline handling:

```javascript
async function submitPickupWithOfflineSupport(pickupData) {
  try {
    // Try to submit the pickup
    return await registerPickup(pickupData);
  } catch (error) {
    // If it's a network error, store in offline queue
    if (!navigator.onLine) {
      const offlineQueue = JSON.parse(localStorage.getItem('offlinePickups') || '[]');
      offlineQueue.push(pickupData);
      localStorage.setItem('offlinePickups', JSON.stringify(offlineQueue));
      
      return {
        success: false,
        offline: true,
        message: 'Pickup saved offline. Will sync when connection is restored.'
      };
    }
    
    // Otherwise rethrow
    throw error;
  }
}

// Function to sync offline pickups when back online
function syncOfflinePickups() {
  const offlineQueue = JSON.parse(localStorage.getItem('offlinePickups') || '[]');
  
  if (offlineQueue.length === 0) return;
  
  // Process each offline pickup
  const promises = offlineQueue.map(async (pickupData, index) => {
    try {
      await registerPickup(pickupData);
      
      // Remove from queue if successful
      return index;
    } catch (error) {
      console.error('Failed to sync pickup:', error);
      return -1;
    }
  });
  
  // Update the offline queue, removing successful ones
  Promise.all(promises).then(indices => {
    const validIndices = indices.filter(i => i !== -1).sort((a, b) => b - a);
    
    // Create new queue without the synced items
    const newQueue = [...offlineQueue];
    validIndices.forEach(i => {
      newQueue.splice(i, 1);
    });
    
    // Update local storage
    localStorage.setItem('offlinePickups', JSON.stringify(newQueue));
  });
}

// Add event listener to detect when back online
window.addEventListener('online', syncOfflinePickups);
```

## Testing the API

You can test the API using tools like Postman, Insomnia, or directly from the browser console.

Example test in browser console:

```javascript
// Test getting a package by QR code
fetch('http://localhost:3000/api/packages/QR123456')
  .then(response => response.json())
  .then(data => console.log('Package data:', data))
  .catch(error => console.error('Error:', error));

// Test registering a pickup
fetch('http://localhost:3000/api/pickups', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    qrCode: "QR123456",
    driverId: "DRV001",
    pickupLocation: {
      latitude: 9.0106,
      longitude: 38.7780
    },
    pickupTimestamp: new Date().toISOString(),
    storeManagerSignature: "base64SignatureData",
    driverSignature: "base64SignatureData",
    notes: "Test pickup"
  }),
})
  .then(response => response.json())
  .then(data => console.log('Pickup registered:', data))
  .catch(error => console.error('Error:', error));
```

## Next Steps

Once you've integrated the API with your UI, you can:

1. Extend the mock API to include the Track and Trace and ePOD modules
2. Add more realistic data to match your actual business needs
3. Implement proper authentication mechanisms
4. Enhance error handling and validation
5. Add more sophisticated offline support

This mock API provides a solid foundation for developing your user interface without needing a full backend implementation, allowing you to focus on creating a great user experience.
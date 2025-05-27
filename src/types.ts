export interface User {
   id:string;
   email:string; 
   password:string
   role:string;
   permissions:Permission[]
}


export interface Permission {
   feature:string;
   read:boolean;
   write:boolean;
   update:true;
   delete:boolean;
}
export interface Facilty {
   id:string;
   name:string;
   location:GeofencedLocation;
   address:string;
   
}
export interface GeofencedLocation extends Location {
   geofenceRadius: number; 
 }

export interface VehicleState {
   loading:boolean;
   vehicles:Vehicle[],
   error:String | null,
   success:boolean,
   selectedVehicle:Vehicle | null
}

export interface Vehicle {
   vehicle_id:string;
   plate_number:string;
   vehicle_type:string;
   weight_capacity:number;
   volume_capacity:number;
   current_status: 'active' | 'maintenance' | ' inactive';
}

export interface Pickup {
   id:string;
   qrCode:string;

}

export interface Package {
   qrCode:string;
   customerId:string;
   customerName:string;
   deliveryNumber:string;
   orderNumber:string;
   staus:string;
   items:PackageItem[];
   driverId:string;
   driver:driver;
   pickupLocation:Location;
   pickupTimestamp:string;
   storeManagerSignature:string;
   notes:string;
   createAt:Date;
}

export interface PackageItem {
   name:string;
   quantity:number;
   unit:string;
}

export interface driver{
   id:string;
   name:string;
   phone:string;
   vehicleId:string;
   vehiclePlate:string
}
export interface Location{
   latitude:number;
   longitude:number;
}


export interface AuthState {
   isAuthenticated: boolean;
   role: string | null;
   permissions:object[] | null;
   user: User | null;
   loading: boolean;
   error: string | null;
 }


export type LoginResponse = {
   id: string;
   token: string;
   role: string;
   permissions: string[];
};


export type UserResponse = {
  id: string;
  role: string;
  permissions: string[];
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginUser = {
   email:string,
   password:string
 }
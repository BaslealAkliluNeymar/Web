import { Hash, MapPin, Package } from "lucide-react";
import { Button } from "../components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { useState } from "react";

export default function Items() {
  const [isOpen, setIsOpen] = useState(false);
  const pickupItems = [
    {
      pickup_id: 1,
      product_name: "Medical Syringes",
      quantity: 250,
      unit: "pieces",
      health_facility_name: "Central Hospital"
    },
    {
      pickup_id: 2,
      product_name: "Surgical Masks",
      quantity: 500,
      unit: "boxes",
      health_facility_name: "Community Health Center"
    },
    {
      pickup_id: 3,
      product_name: "Antibiotics",
      quantity: 100,
      unit: "bottles",
      health_facility_name: "Regional Medical Facility"
    }
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Items</Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl @container/card">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
         <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                {pickupItems.map((item, index) => (
                  <div 
                    key={item.pickup_id} 
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                              #{item.pickup_id}
                            </span>
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                              Ready
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {item.product_name}
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-lg">
                            <Hash className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <span className="font-semibold text-green-700">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 bg-purple-50 p-2 rounded-lg">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-600">Facility:</span>
                            <span className="font-medium text-purple-700 truncate">
                              {item.health_facility_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

         
        <SheetFooter>
          <SheetClose asChild>
            <div className="px-6 py-4 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total items: <span className="font-semibold">{pickupItems.length}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>
                    Confirm Pickup
                  </Button>
                </div>
              
                </div>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

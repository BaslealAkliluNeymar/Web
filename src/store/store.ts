import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./authSlice";
import pickupSlice from "./PickupSlice";
import deliverySlice from './deliverySlice'
import vehicleSlice from "./vehicleSlice"
import dialogSlice from "./dialogueSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createLogger } from "redux-logger"



const logger = createLogger()
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    pickup: pickupSlice,
    delivery:deliverySlice,
    vehicle:vehicleSlice,
    dialogue: dialogSlice
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});


// store.subscribe(() =>{
//   console.log(store.getState())
// })

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

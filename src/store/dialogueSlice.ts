// dialogSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    type: null, // 'edit' | 'view'
    vehicle: {},
    isOpen: false,
  },
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.vehicle = action.payload.vehicle;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.type = null;
      state.vehicle = {};
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;

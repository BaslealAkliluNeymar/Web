import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft,
} from "@reduxjs/toolkit";
import {  LoginCredentials, User } from "../types.ts";
import { getUser, login, logout } from "../api/auth";
import { AuthState } from "../types";

const initialState: AuthState = {
  isAuthenticated: false,
  role:null,
  permissions:[],
  user: null,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk
("users/login", async (user: LoginCredentials,{ rejectWithValue })=> {
  try {
    const response = await login(user);
    return response;
  } catch (error) {
    if(error instanceof Error){
      return rejectWithValue(error.message);
    }
     return rejectWithValue("Unknown Error");
  }
});

export const generateUserAsync = createAsyncThunk(
  "users/generateUser",
  async () => {
    try {
      const response = await getUser()
      return response.data
    } catch (err) {
      throw new Error("User loading failed");
    }
  }
);

export const logoutAsync = createAsyncThunk<void,void>("users/logout", async () => {
  try {
    const data = await logout()
    return data
  } catch (err) {
    throw new Error("Logout failed");
  }
});
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state: Draft<AuthState>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state: Draft<AuthState>,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.id;  
        state.role = action.payload.role;
        state.permissions = action.payload.permissions;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(generateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.id;
        state.error = null;
        state.role = action.payload.role || [];
        state.permissions = action.payload.permissions || []

      })
      .addCase(generateUserAsync.rejected, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;  
          state.user = null;             
          state.role = null;            
          state.permissions = [];       
          state.error = action.error.message || "Something went wrong";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.role = null;
        state.permissions = []
      });
  },
});

export const { loginStart, loginSuccess } = userSlice.actions;
export default userSlice.reducer;

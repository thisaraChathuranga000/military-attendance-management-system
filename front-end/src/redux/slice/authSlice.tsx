import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from '../../interfaces/User';

interface AuthState {
  isAuthenticated: boolean;
  user: UserCredential | null;
  userType: String;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userType:""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserCredential>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setUserType:(state, action: PayloadAction<String>) => {
      state.userType = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, setUserType } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  id: number;
  userName: string;
  password: string;
  svcNo: string;
  name: string;
  intake: string;
  platoon: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../interfaces/User';

interface UserState {
  userData: UserData | undefined | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
  },
});

export const { setSelectedUserData } = userSlice.actions;
export default userSlice.reducer;

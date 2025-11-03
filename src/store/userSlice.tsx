import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    deleteUser: (state) => {
      state.userName = '';
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

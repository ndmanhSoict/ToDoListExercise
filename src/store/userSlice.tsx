import { loginApi, logoutApi } from '@api/authAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { username: string; password: string }) => {
    const response = await loginApi(userData);
    // console.log('response: ', response);
    return response.data;
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const response = await logoutApi();
  // console.log('response: ', response);
  return response;
});

type UserStore = {
  data: { id: string; userName: string | null };
  loading: boolean;
  error: string | null;
};

const initialState: UserStore = {
  data: { id: '', userName: '' },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName: (state) => {
      const newUserName = localStorage.getItem('userName');
      state.data.userName = newUserName;
    },
  },
  extraReducers: (builder) =>
    builder
      // ---- Login ----
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action: ', action);
        state.data = {
          ...state.data,
          id: action.payload.data.user.id,
          userName: action.payload.data.user.username,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load todos';
      })

      // ---- Logout ----
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action: ', action);
        state = initialState;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load todos';
      }),
});

export const { updateUserName } = userSlice.actions;
export default userSlice.reducer;

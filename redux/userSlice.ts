import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  userType?: string;
  company?: string;
  domain?: string;
  approvalStatus?: string;
}

interface UserState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: UserState = {
  token: null,
  refreshToken: null,
  user: null,
};

type CredentialsPayload = {
  token: string;
  user: User;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const accessToken = getCookie('accessToken');
const userCookie = getCookie('user');

const initialState = {
  token: typeof accessToken === 'string' ? JSON.parse(accessToken) : null,
  user: typeof userCookie === 'string' ? JSON.parse(userCookie) : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      setCookie('accessToken', JSON.stringify(action.payload.token || null), {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      setCookie('user', JSON.stringify(action.payload.user || null), {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      // clearCookies();
      deleteCookie('accessToken');
      deleteCookie('user');
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;

// interface User {
//   email: string;
//   firstName: string;
//   lastName: string;
//   userType?: string;
//   company?: string;
//   domain?: string;
//   dateJoined: string
//   approvalStatus?: string;
// }

// interface UserState {
//   token: string | null;
//   user: User | null;
// }

// type CredentialsPayload = {
//   token: string;
//   user: User;
// };

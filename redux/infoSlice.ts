import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoState {
  latitude: string | null;
  longitude: string | null;
  browser: string | null;
  device: string | null;
  ip: string | null;
}

const initialState: InfoState = {
  latitude: null,
  longitude: null,
  browser: null,
  device: null,
  ip: null,
};

interface InfoPayload {
  latitude: string;
  longitude: string;
  browser: string;
  device: string;
  ip: string;
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<InfoPayload>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.browser = action.payload.browser;
      state.device = action.payload.device;
      state.ip = action.payload.ip;
    },
  },
});

export const { setInfo } = infoSlice.actions;
export default infoSlice.reducer;

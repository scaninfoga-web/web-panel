import { get } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
interface WalletState {
  balance: number;
  loading: boolean;
  error: any;
}

const initialState: WalletState = {
  loading: false,
  error: null,
  balance: 0,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWalletBalance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.balance = action.payload;
        },
      )
      .addCase(fetchWalletBalance.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch balance';
      });
  },
});

export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (_, thunkAPI) => {
    try {
      const data = await get('/api/payments/getWalletBalance');
      return data.responseData.balance;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const { setBalance } = walletSlice.actions;
export default walletSlice.reducer;

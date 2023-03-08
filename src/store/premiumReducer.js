import { createSlice } from '@reduxjs/toolkit';

const initialState = { theme: 'light', premium: false, premiumShow:false };

const premiumSlice = createSlice({
  name: 'Theme',
  initialState: initialState,
  reducers: {
    dark(state) {
      state.theme = 'dark';
    },
    light(state) {
      state.theme = 'light';
    },
    premium(state, action) {
      state.premium = action.payload;
      if(action.payload) {
        state.theme = 'dark';
      }
      if(!action.payload && state.theme === 'dark') {
        state.theme = 'light';
      }
    },
    showPremium(state, action) {
      state.premiumShow = action.payload;
    }
  },
});

export const premiumActions = premiumSlice.actions;
export default premiumSlice.reducer;
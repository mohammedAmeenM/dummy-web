import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  subscription: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { setUserDetails, setSubscription } = userSlice.actions;
export default userSlice.reducer;

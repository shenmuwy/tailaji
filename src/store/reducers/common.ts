import { createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  name: 'common',
  initialState: {
    isExpande: false,
    token: ''
  },
  reducers: {
    setIsExpande: (state, action) => {
      state.isExpande = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})

export default counterSlice.reducer
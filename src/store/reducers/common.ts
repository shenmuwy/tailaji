import { createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  name: 'common',
  initialState: {
    isExpande: false,
    token: '',
    userAvatar: ''
  },
  reducers: {
    setIsExpande: (state, action) => {
      state.isExpande = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload
    }
  }
})

export default counterSlice.reducer
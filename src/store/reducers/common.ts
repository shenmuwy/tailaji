import { createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  name: 'common',
  initialState: {
    isExpande: '',
  },
  reducers: {
    setIsExpande: (state, action) => {
      state.isExpande = action.payload
    }
  }
})

export default counterSlice.reducer
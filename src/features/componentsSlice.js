
import { createSlice } from '@reduxjs/toolkit';

const componentsSlice = createSlice({
  name: 'components',
  initialState: {
    selectedComponents: {},
  },
  reducers: {
    setSelectedComponents(state, action) {
      state.selectedComponents = action.payload;
    },
  },
});

export const { setSelectedComponents } = componentsSlice.actions;
export default componentsSlice.reducer;
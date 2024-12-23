
import { configureStore } from '@reduxjs/toolkit';
import componentsReducer from '../features/componentsSlice';

const store = configureStore({
  reducer: {
    components: componentsReducer,
  },
});

export default store;
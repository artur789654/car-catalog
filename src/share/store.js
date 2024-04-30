import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './reducers/carsSlice.reducer';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

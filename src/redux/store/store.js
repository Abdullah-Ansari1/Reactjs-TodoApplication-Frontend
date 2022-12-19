import { configureStore } from '@reduxjs/toolkit';
import todoReducers from '../reducers/todoReducers';
export const store = configureStore({
  reducer: {
  todos:todoReducers
  },
});

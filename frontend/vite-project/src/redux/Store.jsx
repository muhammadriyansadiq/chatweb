
import { configureStore } from '@reduxjs/toolkit';
// import Counterslice from './Counterslice.jsx';
import { api } from './Api.jsx';
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

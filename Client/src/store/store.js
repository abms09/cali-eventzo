import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/authSlice'
import eventsReducer from '../store/eventSlice'
import bookingsReducer from './bookingsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
     bookings: bookingsReducer,
  }
});

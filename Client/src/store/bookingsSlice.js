import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const res = await axios.get("http://localhost:5000/bookings");
    return res.data;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    status: "idle",
    error: null
  },
  reducers: {
    addBooking: (state, action) => {
      state.list.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeBooking: (state, action) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addBooking, removeBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;

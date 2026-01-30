import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { removeBooking } from "../store/bookingsSlice";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { list: bookings } = useSelector((state) => state.bookings);
  const [message, setMessage] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(null);

  if (!currentUser) {
    return (
      <p className="text-center text-red-900">
        Please login to see your bookings.
      </p>
    );
  }

  const myBookings = bookings.filter(
    (b) => b.email === currentUser.email
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleCancel = async (booking) => {
    try {
      await axios.delete( `http://localhost:5000/bookings/${booking.id}` );
      dispatch(removeBooking(booking.id));
      alert("Booking canceled! Refund will be credited to your account soon.");
      setConfirmCancel(null);
    } catch (err) {
      console.error("Cancel failed:", err);
      setMessage("Cancel failed. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-30 px-10">
      <h2 className="text-2xl font-bold text-center text-red-900 mb-6">
        My Bookings
      </h2>

      {message && (
        <div className="mb-4 text-center text-green-700 bg-green-100 p-3 rounded-lg">
          {message}
        </div>
      )}

      {myBookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No bookings yet!</p>
          <Link to="/" className="text-red-900 hover:underline">
            Browse Events
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {myBookings.map((booking) => {
            const bookingDate = new Date(booking.date); 
            bookingDate.setHours(0, 0, 0, 0);

            const isPastBooking = bookingDate < today;

            return (
              <li key={booking.id} className="bg-white border rounded-lg shadow-md p-4" >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {booking.eventTitle}
                    </h3>
                    <p className="text-gray-700">
                      <strong>Booked By:</strong>{" "}
                      {booking.name || currentUser.name}
                    </p>
                    <p className="text-gray-600">
                      Tickets:{" "}
                      <span className="font-medium">{booking.tickets}</span>
                    </p>
                    <p className="text-gray-600">
                      Total Paid:{" "}
                      <span className="font-medium text-red-900">
                        ₹{booking.total}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Event Date:{" "}
                      <span className="font-medium">{booking.eventDate}</span>
                    </p>
                    <p className="text-gray-600">
                      Booking Date:{" "}
                      <span className="font-medium">
                        {new Date().toLocaleDateString("en-IN")}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Mobile:{" "}
                      <span className="font-medium">{booking.mobile}</span>
                    </p>
                  </div>
                  {!isPastBooking && (
                    <button onClick={() => setConfirmCancel(booking)} className="bg-red-900 text-white px-3 py-1 rounded-lg hover:bg-red-800">
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {confirmCancel && (
        <div className="fixed inset-0 bg-red-200 bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-sm">
            <p className="text-lg text-gray-800 mb-4">
              Are you sure you want to cancel the booking for{" "}
              <strong>{confirmCancel.eventTitle}</strong>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-900 text-white px-4 py-2 rounded-lg"
                onClick={() => handleCancel(confirmCancel)}
              >
                Yes, Cancel
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setConfirmCancel(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

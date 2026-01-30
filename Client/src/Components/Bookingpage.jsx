import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBooking } from "../store/bookingsSlice";
import axios from "axios";

const BookingPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list: events } = useSelector((state) => state.events);
  const bookings = useSelector((state) => state.bookings.list);
  const event = events.find((e) => e.id.toString() === id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [tickets, setTickets] = useState(1);
  const [errors, setErrors] = useState({});
  const [booked, setBooked] = useState(false);

  if (!event) return <p>Event not found.</p>;

  const pricePerTicket = event.price;
  const total = tickets * pricePerTicket;

 useEffect(() => {
  const existingBooking = bookings.find(
    (b) => b.eventId.toString() === id &&
           b.email === currentUser.email
  );

  if (existingBooking) {
    setBooked(true);
  }
}, [bookings, id, currentUser.email]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";

    if (!form.mobile.trim()) errs.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(form.mobile))
      errs.mobile = "Mobile must be 10 digits.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleDecrease = () => {
    if (tickets > 1) setTickets(tickets - 1);
  };

  const handleIncrease = () => {
    setTickets(tickets + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const bookingData = {
      eventId: event.id,
      email: currentUser.email,
      eventTitle: event.title,
      eventDate:event.startDate,
      tickets,
      total,
      name:form.name,
      mobile: form.mobile,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/bookings",
        bookingData
      );

      dispatch(addBooking(res.data));
      setBooked(true);
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  if (booked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 px-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center border border-red-200 max-w-md">
          <h2 className="text-3xl font-bold text-red-900 mb-4">
            🎉 Booking Confirmed!
          </h2>
          <p className="text-gray-700 mb-3">
            Your tickets for{" "}
            <span className="font-semibold">{event.title}</span> are booked
            successfully.
          </p>
          <p className="text-gray-700">
            We will send the details to your mobile number.
          </p>
          <button onClick={() => navigate("/")} className="mt-6 bg-red-900 text-white py-2 px-6 rounded-lg hover:bg-red-800 transition" >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4 py-10">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl border border-red-200">
        <h2 className="text-3xl font-extrabold text-center text-red-900 mb-6">
          Book Tickets
        </h2>

        <div className="text-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800">
            {event.title}
          </h3>
          <p className="text-gray-600">₹{pricePerTicket} per ticket</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900" />
            {errors.name && (
              <p className="text-red-900 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900" />
            {errors.email && (
              <p className="text-red-900 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900" />
            {errors.mobile && (
              <p className="text-red-900 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-700">Tickets:</span>
            <div className="flex items-center space-x-3">
              <button type="button" onClick={handleDecrease} className="bg-red-900 text-white px-3 py-1 rounded-lg hover:bg-red-800" >
                −
              </button>
              <span className="text-lg font-medium">{tickets}</span>
              <button type="button" onClick={handleIncrease} className="bg-red-900 text-white px-3 py-1 rounded-lg hover:bg-red-800" >
                +
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <span className="font-semibold text-gray-700">Total:</span>{" "}
            <span className="text-xl font-bold text-red-900">₹{total}</span>
          </div>

          <button type="submit" className="w-full bg-red-900 text-white font-semibold py-3 rounded-lg hover:bg-red-800 transition" >
            Pay & Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;

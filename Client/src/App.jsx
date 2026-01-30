import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./store/eventSlice";
import { fetchBookings } from "./store/bookingsSlice";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./components/Footer";
import EventDetails from "./Components/EventDetails";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Events from "./Pages/Events";
import BookingPage from "./Components/Bookingpage";
import MyBookings from "./Pages/Mybookings";
import Profile from "./Pages/Profile";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  return isAuthenticated ? children : <Login />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchBookings());
  },[dispatch]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />

          <Route path="/my-bookings" element={ <ProtectedRoute> <MyBookings /> </ProtectedRoute> } />
          <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> }/>
        </Routes>
      <Footer />
    </div>
  );
};

export default App;

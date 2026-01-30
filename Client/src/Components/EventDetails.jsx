import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { list: events, status } = useSelector((state) => state.events);
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  if (status === "loading") {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  const event = events.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Event not found.
      </div>
    );
  }

  const handleBooking = () => {
    if (isAuthenticated) {
      navigate(`/booking/${event.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={event.image || "https://via.placeholder.com/1200x600"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {event.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-6 space-x-6">
            <div className="flex items-center">
              <span className="font-semibold mr-2">📅 Date:</span>
              <span>{event.startDate}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">📍 Venue:</span>
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">🎟️ Ticket:</span>
              <span className="font-bold text-2xl">
                {event.price
                  ? `${event.currency} ${event.price}/-`
                  : "Free / Not Available"}
              </span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg">
            {event.description}
          </p>

          <div className="mt-8">
            <button
              onClick={handleBooking}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              {isAuthenticated ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

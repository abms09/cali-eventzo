import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Events = () => {
  const { list: events, status } = useSelector((state) => state.events);

  if (status === "loading") {
    return (
      <div className="text-center mt-12 text-lg font-semibold text-red-600">
        Loading events...
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center mt-12 text-lg font-semibold text-gray-700">
        No events available.
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-900 mb-8">
        All Events
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition" >
            <img src={`${import.meta.env.BASE_URL}${event.image}`} alt={event.title} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                📅 {event.startDate}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                📍 {event.venue}
              </p>

              <Link to={`/events/${event.id}`} className="inline-block text-red-600 font-semibold hover:underline" >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;

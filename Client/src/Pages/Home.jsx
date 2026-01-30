import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const events = useSelector((state) => state.events.list);
console.log("Events in store:", events);
const [showModal, setShowModal] = useState(false);


  return (
    <div className="bg-gray-50 min-h-screen text-stone-800">

     <section
  className="relative text-white py-70 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/public/Images/home.jpg')",
  }}
>
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative max-w-5xl mx-auto text-center px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Discover & Book Events in Calicut
    </h1>
    <p className="text-lg md:text-xl mb-6">
      Music concerts, theatre shows, workshops, festivals all in one place!
    </p>
    <Link
  to="/events"
  className="inline-block bg-red-900 text-white font-semibold px-6 py-3 rounded shadow hover:bg-red-800 transition"
>
  Browse Events
</Link>

  </div>
</section>


      <section className="py-20 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">

        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Events
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className=" rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={event.image || "https://via.placeholder.com/400x250"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {event.startDate} · {event.venue}
                  </p>
                  <Link
                    to={`/events/${event.id}`}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-950 text-white py-25">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-3">
            Want to Host Your Own Event?
          </h2>
          <p className="mb-4">
            Reach your audience with ease add and manage your events seamlessly.
          </p>
          <button onClick={() => setShowModal(true)} className="bg-white text-red-600 font-semibold px-5 py-2 rounded hover:bg-gray-100 transition">
           Add Your Event
          </button>

        </div>
        {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center animate-scaleIn">
      
      <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
      
      <p className="text-gray-600 mb-6">
        The <span className="font-semibold">Add Event</span> feature is currently
        under development. You can contact us to add your event now.. Stay tuned!
      </p>

      <button
        onClick={() => setShowModal(false)}
        className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Okay
      </button>
    </div>
  </div>
)}

      </section>
    </div>
  );
};

export default Home;

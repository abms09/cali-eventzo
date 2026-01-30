import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <footer className="bg-stone-900 text-stone-200 py-15">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Calicut Events
            </h3>
            <p className="mt-2 text-sm">
              Explore and book tickets for the best events in Calicut music,
              theatre, workshops, festivals and more!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-white">
              Quick Links
            </h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/events" className="hover:text-white">
                  Browse Events
                </Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link to="/my-bookings" className="hover:text-white">
                      My Bookings
                    </Link>
                  </li>

                  <li>
                    <Link to="/profile" className="hover:text-white">
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {!user && (
                <>
                  <li>
                    <Link to="/login" className="hover:text-white">
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link to="/register" className="hover:text-white">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-md font-semibold text-white">
              Support
            </h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-md font-semibold text-white">
              Follow Us
            </h4>
            <div className="flex space-x-4 mt-2 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                📘
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                🐦
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                📸
              </a>
              <a
                href="mailto:support@calicutevents.com"
                className="hover:text-white"
              >
                ✉️
              </a>
            </div>
          </div>

        </div>

        <hr className="my-6 border-stone-700" />

        <p className="text-center text-sm text-stone-400">
          © {new Date().getFullYear()} Calicut Events. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

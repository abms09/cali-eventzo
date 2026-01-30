import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import profileicon from "../assets/profile-icon.svg";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-red-900 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl lg:text-3xl font-extrabold bg-red-100 bg-clip-text text-transparent" >
            Cali-Eventzo
          </Link>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-stone-200 hover:bg-stone-100 hover:text-stone-800 transition" >
              {isOpen ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>

          <div className={`${ isOpen ? "block" : "hidden" } lg:flex absolute lg:static top-16 left-0 w-full lg:w-auto bg-red-900 lg:bg-transparent shadow-lg lg:shadow-none rounded-b-xl`} >
            <ul className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-6 px-4 py-4 lg:p-0 text-stone-700">
              <NavItem to="/" label="Home" />
              {user && (
                <>
                  <NavItem to="/events" label="Events" />
                  <NavItem to="/my-bookings" label="My Bookings" />
                  <NavItem to="/contact" label="Contact Us" />
                  <NavItem to="/profile" label={
                      <>
                        <img src={profileicon} alt="Profile" width="30" height="30" style={{ marginRight: "8px" }} />
                      </>
                    }
                  />
                </>
              )}

              {!user && (
                <>
                  <NavItem to="/events" label="Events" />
                  <NavItem to="/contact" label="Contact Us" />
                  <NavItem to="/login" label="Login" />
                  <NavItem to="/register" label="Register" />
                </>
              )}
              <ThemeToggle />

              {user && (
                <li>
                  <button onClick={handleLogout} className="w-full lg:w-auto px-4 py-2 text-sm font-semibold text-red-100 border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-700 transition" >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
const NavItem = ({ to, label }) => (
  <li>
    <NavLink to={to} className={({ isActive }) => `block px-4 py-2 rounded-lg font-medium transition 
        ${ isActive ? "text-red-100 border border-red-500" : "text-red-100 border border-transparent" } hover:bg-stone-100 hover:text-red-700`} >
      {label}
    </NavLink>
  </li>
);

export default Navbar;

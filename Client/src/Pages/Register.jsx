import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authStart,authSuccess,authFailure} from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile:"",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      dispatch(authFailure("All fields are required"));
      return;
    }

    if (form.password.length < 6) {
      dispatch(authFailure("Password must be at least 6 characters"));
      return;
    }

    if (form.password !== form.confirmPassword) {
      dispatch(authFailure("Passwords do not match"));
      return;
    }

    try {
      dispatch(authStart());
      const exists = await axios.get(`http://localhost:5000/users?email=${form.email}`);
      if (exists.data.length > 0) {
        dispatch(authFailure("Email already registered"));
        return;
      }

      const res = await axios.post("http://localhost:5000/users", {
        name: form.name,
        email: form.email,
        mobile:form.mobile,
        password: form.password
      });

      dispatch(authSuccess(res.data));
      navigate("/login");
    } catch (error) {
      dispatch(authFailure("Registration failed. Try again."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border border-red-200" >
        <h2 className="text-3xl font-extrabold text-center text-red-900 mb-6">
          Create Account
        </h2>

        <div className="relative mb-4">
          <input name="name" placeholder="Full Name" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={handleChange} />
        </div>

        <div className="relative mb-4">
          <input type="email" name="email" placeholder="Email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={handleChange} />
        </div>

        <div className="relative mb-4">
          <input type="number" name="mobile" placeholder="Mobile" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={handleChange} />
        </div>

        <div className="relative mb-4">
          <input type="password" name="password" placeholder="Password" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={handleChange} />
        </div>

        <div className="relative mb-4">
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={handleChange} />
        </div>

        {error && (
          <p className="text-red-900 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <button disabled={loading} className="w-full bg-red-900 text-white font-semibold py-3 rounded-lg hover:bg-red-800 active:scale-95 transition-transform duration-150" >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?
          <Link to="/login"  className="text-red-900 font-medium ml-1 hover:underline" >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

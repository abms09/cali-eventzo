import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authStart,authSuccess,authFailure} from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(authFailure("All fields are required"));
      return;
    }

    try {
      dispatch(authStart());
      const res = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

      if (res.data.length === 0) {
        dispatch(authFailure("Invalid email or password"));
        return;
      }

      dispatch(authSuccess(res.data[0]));
      navigate("/");
    } catch (error) {
      dispatch(authFailure("Server error. Try again later."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border border-red-200" >
        <h2 className="text-3xl font-extrabold text-center text-red-900 mb-6">
          Welcome Back
        </h2>

        <div className="relative mb-4">
          <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="relative mb-4">
          <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 transition" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        {error && (
          <p className="text-red-900 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <button disabled={loading} className="w-full bg-red-900 text-white font-semibold py-3 rounded-lg hover:bg-red-800 active:scale-95 transition-transform duration-150" >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-900 font-medium hover:underline" >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

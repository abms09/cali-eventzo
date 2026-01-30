import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [mobile, setMobile] = useState(currentUser?.mobile || "");
  const [message, setMessage] = useState("");

  if (!currentUser) {
    return (
      <div className="text-center text-red-600 mt-10">
        Please login to view your profile.
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, mobile }));
    setMessage("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-25 px-10">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <img className="h-24 w-24 object-cover rounded-full border-4 border-red-900" src={`https://ui-avatars.com/api/?name=${encodeURIComponent( currentUser.name )}&background=red&color=fff&size=128`} alt="Profile avatar"/>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hello, {currentUser.name}!
            </h2>
            <p className="text-gray-600">
              Welcome to your profile dashboard.
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-4 text-center text-green-700 bg-green-100 p-3 rounded-lg">
            {message}
          </div>
        )}

        {!editing && (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-gray-500 font-medium">Name</p>
              <p className="text-lg text-gray-800">{currentUser.name}</p>
            </div>

            <div>
              <p className="text-gray-500 font-medium">Email</p>
              <p className="text-lg text-gray-800">{currentUser.email}</p>
            </div>

            <div>
              <p className="text-gray-500 font-medium">Mobile</p>
              <p className="text-lg text-gray-800">
                {currentUser.mobile}
              </p>
            </div>

            <button onClick={() => setEditing(true)} className="mt-4 w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-800 transition" >
              Edit Profile
            </button>
          </div>
        )}

        {editing && (
          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Name
              </label>
              <input type="text" className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Email
              </label>
              <input type="email" className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mobile
              </label>
              <input type="text" className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-red-900 text-white py-2 rounded-lg hover:bg-red-800 transition">
                Save
              </button>
              <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition" >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;

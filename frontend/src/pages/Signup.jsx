// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../api/authApi";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       navigate("/login");
//     } catch (err) {
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
//         <h2 className="text-2xl mb-4">Sign Up</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 border-b bg-white">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">AI</span>
          </div>
          <span className="font-medium">AI Notes</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
          />
          
          <button 
            type="submit" 
            className="w-full p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
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
//     } catch {
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
//       <header className="p-4 border-b bg-white shadow-sm">
//         <div className="max-w-4xl mx-auto flex items-center gap-2">
//           <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
//             <span className="text-white text-lg font-bold">VN</span>
//           </div>
//           <span className="text-xl font-semibold text-gray-800">VoiceNotes</span>
//         </div>
//       </header>

//       <div className="flex-1 flex items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create your account</h2>
//           {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 placeholder="John Doe"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
//               />
//             </div>
            
//             <button 
//               type="submit" 
//               className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
//             >
//               Sign Up
//             </button>
//           </form>
          
//           <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Initialize theme based on user preference or system preference
  useEffect(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Otherwise check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply theme whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to local storage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-indigo-100'} flex flex-col`}>
      <header className={`p-4 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm transition-colors duration-200`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">VN</span>
            </div>
            <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>VoiceNotes</span>
          </div>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-purple-100 text-gray-700'}`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-8 rounded-xl shadow-md w-full max-w-md transition-colors duration-200`}>
          <h2 className="text-3xl font-bold mb-6 text-center">Create your account</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg outline-none transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                    : 'border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                }`}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg outline-none transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                    : 'border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                }`}
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg outline-none transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                    : 'border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                }`}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
          
          <p className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-500 hover:text-purple-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import MainLayout from "@/layouts/MainLayout";
// import Dashboard from "@/pages/Dashboard";
// import Login from "@/pages/Login";
// import Signup from "@/pages/Signup";

// const App = () => {
//   return (
//     <Router>
//       <MainLayout>
        
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </MainLayout>
//     </Router>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (inside MainLayout) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} /> {/* "/" renders Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import  Homepage from "@/pages/Home";
import PrivateRoute from "@/components/PrivateRoute"; 

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

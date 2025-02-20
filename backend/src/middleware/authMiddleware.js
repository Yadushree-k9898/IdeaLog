import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  console.log("🔐 Checking Authorization Header:", req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔑 Extracted Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("👤 User Found:", req.user ? req.user.id : "No user found");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("❌ Auth Middleware Error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    console.log("❌ No Authorization Header Found");
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

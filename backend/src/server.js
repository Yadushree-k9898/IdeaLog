import app from './app.js';
import cors from "cors";

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*", 
    credentials: true, 
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS", 
    allowedHeaders: "Content-Type, Authorization", 
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

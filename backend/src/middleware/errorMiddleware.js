const errorHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err.stack || err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { errorHandler };

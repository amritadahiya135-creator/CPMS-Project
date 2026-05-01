exports.checkHealth = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'CPMS Backend is running smoothly',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
};

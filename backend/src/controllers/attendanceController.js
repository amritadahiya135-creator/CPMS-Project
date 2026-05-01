const attendanceService = require('../services/attendanceService');

exports.markAttendance = async (req, res, next) => {
  try {
    // Pass the active user's ID as the recorder
    const attendance = await attendanceService.markAttendance(req.body, req.user._id);
    res.status(201).json({ success: true, data: attendance });
  } catch (error) { next(error); }
};

exports.getAttendanceBySubject = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getAttendanceBySubject(req.params.subjectId);
    res.status(200).json({ success: true, data: attendance });
  } catch (error) { next(error); }
};

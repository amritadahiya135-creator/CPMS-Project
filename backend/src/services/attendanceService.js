const Attendance = require('../models/Attendance');
const Subject = require('../models/Subject');
const AppError = require('../utils/AppError');

exports.markAttendance = async (data, professorUserId) => {
  const { subject_id, date, present_students } = data;

  // Validate subject exists
  const subject = await Subject.findById(subject_id);
  if (!subject) throw new AppError('Subject not found', 404);

  // Note: Depending on rules, we might want to ensure the professor marking it is the one assigned to the subject.
  // We'll skip that strict check for brevity but it's a good architecture discussion point.

  // Check if attendance already marked for this subject on this date to avoid duplicates
  const existing = await Attendance.findBySubjectAndDate(subject_id, date);
  if (existing.length > 0) {
    throw new AppError('Attendance already marked for this subject on this date', 400);
  }

  const attendanceRecord = {
    subject_id,
    date,
    present_students,
    recorded_by: professorUserId
  };

  return Attendance.create(attendanceRecord);
};

exports.getAttendanceBySubject = async (subjectId) => {
  return Attendance.findMany({ subject_id: subjectId });
};

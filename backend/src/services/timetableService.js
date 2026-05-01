const Timetable = require('../models/Timetable');
const AppError = require('../utils/AppError');

exports.createOrUpdateTimetable = async (data) => {
  const { day, slots } = data;
  
  // Check if timetable for this day already exists
  const existing = await Timetable.findByDay(day);
  
  if (existing) {
    // Update existing
    return Timetable.update(existing._id, existing._rev, { day, slots });
  } else {
    // Create new
    return Timetable.create({ day, slots });
  }
};

exports.getTimetableByDay = async (day) => {
  const timetable = await Timetable.findByDay(day);
  if (!timetable) throw new AppError(`No timetable found for ${day}`, 404);
  return timetable;
};

exports.getAllTimetables = async () => {
  return Timetable.findMany();
};

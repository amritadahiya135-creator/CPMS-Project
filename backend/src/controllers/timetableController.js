const timetableService = require('../services/timetableService');

exports.createOrUpdateTimetable = async (req, res, next) => {
  try {
    const timetable = await timetableService.createOrUpdateTimetable(req.body);
    res.status(200).json({ success: true, data: timetable });
  } catch (error) { next(error); }
};

exports.getTimetable = async (req, res, next) => {
  try {
    const timetable = await timetableService.getTimetableByDay(req.params.day);
    res.status(200).json({ success: true, data: timetable });
  } catch (error) { next(error); }
};

exports.getAllTimetables = async (req, res, next) => {
  try {
    const timetables = await timetableService.getAllTimetables();
    res.status(200).json({ success: true, data: timetables });
  } catch (error) { next(error); }
};

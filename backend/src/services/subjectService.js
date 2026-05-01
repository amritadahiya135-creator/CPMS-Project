const Subject = require('../models/Subject');
const Professor = require('../models/Professor');
const AppError = require('../utils/AppError');

exports.createSubject = async (data) => {
  // Ensure the assigned professor exists
  if (data.professor_id) {
    const prof = await Professor.findById(data.professor_id);
    if (!prof) throw new AppError('Assigned professor not found', 404);
  }
  return Subject.create(data);
};

exports.getAllSubjects = async () => {
  return Subject.findMany();
};

exports.getSubjectById = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) throw new AppError('Subject not found', 404);
  return subject;
};

exports.updateSubject = async (id, rev, data) => {
  if (data.professor_id) {
    const prof = await Professor.findById(data.professor_id);
    if (!prof) throw new AppError('Assigned professor not found', 404);
  }
  return Subject.update(id, rev, data);
};

exports.deleteSubject = async (id, rev) => {
  return Subject.delete(id, rev);
};

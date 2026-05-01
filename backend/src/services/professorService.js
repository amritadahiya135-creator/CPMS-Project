const Professor = require('../models/Professor');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.createProfessor = async (data) => {
  // Validate that the linked user exists
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError('Linked user not found', 404);
  }
  return Professor.create(data);
};

exports.getAllProfessors = async () => {
  return Professor.findMany();
};

exports.getProfessorById = async (id) => {
  const professor = await Professor.findById(id);
  if (!professor) {
    throw new AppError('Professor not found', 404);
  }
  return professor;
};

exports.updateProfessor = async (id, rev, data) => {
  return Professor.update(id, rev, data);
};

exports.deleteProfessor = async (id, rev) => {
  return Professor.delete(id, rev);
};

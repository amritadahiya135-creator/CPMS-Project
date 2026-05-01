const professorService = require('../services/professorService');

exports.createProfessor = async (req, res, next) => {
  try {
    const professor = await professorService.createProfessor(req.body);
    res.status(201).json({ success: true, data: professor });
  } catch (error) { next(error); }
};

exports.getAllProfessors = async (req, res, next) => {
  try {
    const professors = await professorService.getAllProfessors();
    res.status(200).json({ success: true, data: professors });
  } catch (error) { next(error); }
};

exports.getProfessor = async (req, res, next) => {
  try {
    const professor = await professorService.getProfessorById(req.params.id);
    res.status(200).json({ success: true, data: professor });
  } catch (error) { next(error); }
};

exports.updateProfessor = async (req, res, next) => {
  try {
    const { rev } = req.body; // Requires _rev for Cloudant updates
    const updated = await professorService.updateProfessor(req.params.id, rev, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) { next(error); }
};

exports.deleteProfessor = async (req, res, next) => {
  try {
    const { rev } = req.query; // Send rev in query for DELETE requests
    await professorService.deleteProfessor(req.params.id, rev);
    res.status(204).send();
  } catch (error) { next(error); }
};

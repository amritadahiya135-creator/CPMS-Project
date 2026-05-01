const subjectService = require('../services/subjectService');

exports.createSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (error) { next(error); }
};

exports.getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({ success: true, data: subjects });
  } catch (error) { next(error); }
};

exports.getSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    res.status(200).json({ success: true, data: subject });
  } catch (error) { next(error); }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const { rev } = req.body;
    const updated = await subjectService.updateSubject(req.params.id, rev, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) { next(error); }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const { rev } = req.query;
    await subjectService.deleteSubject(req.params.id, rev);
    res.status(204).send();
  } catch (error) { next(error); }
};

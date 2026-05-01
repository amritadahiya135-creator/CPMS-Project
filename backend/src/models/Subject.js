const BaseModel = require('./BaseModel');

class SubjectModel extends BaseModel {
  constructor() {
    super('subject');
  }

  // Example of a specific query for this domain
  async findByProfessorId(professorId) {
    return this.findMany({ professor_id: professorId });
  }
}

module.exports = new SubjectModel();

const BaseModel = require('./BaseModel');

class ProfessorModel extends BaseModel {
  constructor() {
    super('professor');
  }
}

module.exports = new ProfessorModel();

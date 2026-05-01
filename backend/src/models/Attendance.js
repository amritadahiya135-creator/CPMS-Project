const BaseModel = require('./BaseModel');

class AttendanceModel extends BaseModel {
  constructor() {
    super('attendance');
  }

  async findBySubjectAndDate(subjectId, date) {
    return this.findMany({ subject_id: subjectId, date: date });
  }
}

module.exports = new AttendanceModel();

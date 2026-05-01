const BaseModel = require('./BaseModel');

class TimetableModel extends BaseModel {
  constructor() {
    super('timetable');
  }

  async findByDay(day) {
    const results = await this.findMany({ day: day });
    return results.length > 0 ? results[0] : null;
  }
}

module.exports = new TimetableModel();

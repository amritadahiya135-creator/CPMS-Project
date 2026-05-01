const cloudant = require('../config/db');
const { DB_NAME } = require('../config/initDb');
const AppError = require('../utils/AppError');

/**
 * BaseRepository class providing standard CRUD operations using IBM Cloudant.
 * This abstracts the SDK complexities away from the controllers/services.
 */
class BaseModel {
  constructor(docType) {
    this.docType = docType; // 'professor', 'subject', 'attendance', 'user'
  }

  checkConnection() {
    if (!cloudant) {
      throw new AppError('Database connection is not established. Please check credentials.', 500);
    }
  }

  async create(data) {
    this.checkConnection();
    const document = { ...data, type: this.docType, createdAt: new Date().toISOString() };
    const response = await cloudant.postDocument({
      db: DB_NAME,
      document: document
    });
    return { _id: response.result.id, _rev: response.result.rev, ...document };
  }

  async findById(id) {
    this.checkConnection();
    try {
      const response = await cloudant.getDocument({
        db: DB_NAME,
        docId: id
      });
      // Ensure the document matches the type requested
      if (response.result.type !== this.docType) {
        return null; // or throw a 404
      }
      return response.result;
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  // Find using Cloudant Mango queries
  async findMany(selector = {}) {
    this.checkConnection();
    // Always restrict queries to this specific document type
    const finalSelector = { ...selector, type: this.docType };
    const response = await cloudant.postFind({
      db: DB_NAME,
      selector: finalSelector
    });
    return response.result.docs;
  }

  async update(id, rev, data) {
    this.checkConnection();
    // Fetch current to ensure type matches, though rev usually guards this
    const existing = await this.findById(id);
    if (!existing) {
      throw new AppError('Document not found', 404);
    }

    const document = { ...existing, ...data, _id: id, _rev: rev, type: this.docType, updatedAt: new Date().toISOString() };
    const response = await cloudant.postDocument({
      db: DB_NAME,
      document: document
    });
    return { ...document, _rev: response.result.rev };
  }

  async delete(id, rev) {
    this.checkConnection();
    try {
      const response = await cloudant.deleteDocument({
        db: DB_NAME,
        docId: id,
        rev: rev
      });
      return response.result;
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }
}

module.exports = BaseModel;

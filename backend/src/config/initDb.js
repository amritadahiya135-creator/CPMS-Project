const cloudant = require('./db');

const DB_NAME = 'cpms_db';

const initializeDatabase = async () => {
  if (!cloudant) {
    console.log('Skipping DB initialization (Cloudant not configured).');
    return;
  }

  try {
    // 1. Check if database exists
    const dbList = await cloudant.getAllDbs();
    
    if (!dbList.result.includes(DB_NAME)) {
      console.log(`Database '${DB_NAME}' not found. Creating...`);
      await cloudant.putDatabase({ db: DB_NAME });
      console.log(`Database '${DB_NAME}' created successfully.`);
    } else {
      console.log(`Database '${DB_NAME}' already exists.`);
    }

    // 2. Create Mango Indexes
    // Index on the 'type' field, which is crucial for our single-database NoSQL strategy
    console.log('Ensuring Mango indexes exist...');
    
    await cloudant.postIndex({
      db: DB_NAME,
      ddoc: 'type-index-design-doc',
      name: 'type-index',
      type: 'json',
      index: {
        fields: ['type']
      }
    });
    
    console.log('Index on "type" field ensured.');
    
  } catch (error) {
    console.error('💥 Error during database initialization:', error);
    // In production, we might want to throw this error to stop the server
    // throw error; 
  }
};

module.exports = {
  initializeDatabase,
  DB_NAME
};

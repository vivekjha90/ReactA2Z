const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
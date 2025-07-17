const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/forexclass');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/forexclass');

    console.log('✅ Successfully connected to MongoDB!');
    
    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📂 Available collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Suggestion: Make sure MongoDB is running on your system');
      console.log('   - Install MongoDB: https://www.mongodb.com/try/download/community');
      console.log('   - Start MongoDB service');
      console.log('   - Or use MongoDB Atlas (cloud): https://cloud.mongodb.com/');
    }
    
    process.exit(1);
  }
};

testConnection();

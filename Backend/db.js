const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/inotebook');
    console.log('Connected to Mongo Successfully');
  } catch (error) {
    console.error('Error connecting to Mongo:', error);
  }
};

module.exports = connectToMongo;

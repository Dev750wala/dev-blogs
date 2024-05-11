import mongoose from 'mongoose';
import { uri } from './db'; // Make sure uri is correctly exported from db.js

export async function dbConnect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true, // this one is deprecated in newer versions.
    });
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  }
}

export async function dbDisconnect() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

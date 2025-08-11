import mongoose from 'mongoose';

export async function connectDB(uri: string) {
  if (!uri) throw new Error('MONGO_URI is not set');
  try {
    const conn = await mongoose.connect(uri);
    const dbName = conn.connection.name;
    console.log(`Mongo connected: ${conn.connection.host}/${dbName}`);
    return conn;
  } catch (err) {
    console.error('Mongo connection error:', err);
    process.exit(1);
  }
}

import mongoose from "mongoose";

const globalCache = globalThis;

if (!globalCache.mongooseConnection) {
  globalCache.mongooseConnection = {
    connection: null,
    promise: null,
  };
}

const cached = globalCache.mongooseConnection;

export default async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((instance) => {
      return instance;
    });
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}

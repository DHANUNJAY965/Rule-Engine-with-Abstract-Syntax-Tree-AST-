// lib/mongodb.ts

import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined; // Use var instead of let
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  minPoolSize: 5,
  maxPoolSize: 50,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Determine the environment and set up the MongoDB client accordingly
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error; // Re-throw the error to handle it later
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for each connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((error) => {
    console.error('MongoDB connection error:', error);
    throw error; // Re-throw the error to handle it later
  });
}

export default clientPromise;

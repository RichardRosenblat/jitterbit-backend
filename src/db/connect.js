import mongoose from 'mongoose';

export async function establishMongoDBConnection() {
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
    mongoose.connection.on('open', () => console.log('Connection opened'));
    mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));
    mongoose.connection.on('reconnected', () => console.log('Connection reestablished'));
    mongoose.connection.on('disconnecting', () => console.log('Disconnecting from MongoDB'));
    mongoose.connection.on('close', () => console.log('Connection closed'));
    const db = await mongoose.connect(process.env.MONGODB_URI);

    process.on('SIGINT', () => {
        console.log("Caught interrupt signal");

        if (db) { db.disconnect(); }
    });
}
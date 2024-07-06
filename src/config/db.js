import mongoose from 'mongoose';

export async function connectDB() {
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
    mongoose.connection.on('open', () => console.log('Connection opened'));
    mongoose.connection.on('disconnecting', () => console.log('Disconnecting from MongoDB'));

    const db = await mongoose.connect(process.env.MONGODB_URI);

    process.on('SIGINT', () => {
        console.log("Disconnecting from MongoDB due to application signal");

        if (db) { db.disconnect(); }
    });
}
import mongoose from 'mongoose';

// Função para conectar ao banco de dados MongoDB
export default async function connectDB() {
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
    mongoose.connection.on('open', () => console.log('Connection opened'));
    mongoose.connection.on('disconnecting', () => console.log('Disconnecting from MongoDB'));

    const db = await mongoose.connect(process.env.MONGODB_URI);

    const handleDisconnectSignal = () => {
        console.log("Shutting down connection to MongoDB...");

        if (db) { 
            db.disconnect();
         }
    };

    process.on('SIGTERM', handleDisconnectSignal);
    process.on('SIGINT', handleDisconnectSignal);
}
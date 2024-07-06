import 'dotenv/config'
import connectDB from './config/db.js';
import app from './app.js';

const stopServer = (server) => {
    console.log('Stopping server');
    server.close();
};

async function main() {
    console.log('Connecting to database...');
    await connectDB();

    const port = process.env.PORT || 3000;

    const server = app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
    process.on('SIGTERM', () => stopServer(server));
    process.on('SIGINT', () => stopServer(server));
    
}
main().catch(err => console.error(err));
import 'dotenv/config'
import { connectDB } from './config/db.js';
import app from './app.js';

async function main() {
    console.log('Connecting to database...');
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}
main().catch(err => console.error(err));
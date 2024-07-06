import { establishMongoDBConnection } from './db/connect.js';

import 'dotenv/config'

async function main() {
    await establishMongoDBConnection();


}
main().catch(err => console.log(err));

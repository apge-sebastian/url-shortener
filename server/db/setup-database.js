import config from '../config/index.js';
import mongoose from 'mongoose';

const connect = async () => {
    try {
        console.log('DB: Connecting...')
        mongoose.createConnection(config.mongodb.url, config.mongodb.options);
        console.log('DB: Connected');
    } catch (e) {
        console.error('DB error: ' + e.message);
        process.exit(1);
    }
}

export default connect;
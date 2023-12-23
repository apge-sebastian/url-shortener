import config from '../config/index.js';
import { MongoClient } from 'mongodb';

class MongoSingleton {
    #client;
    #db;

    constructor() {
        this.#client = new MongoClient(config.mongodb.url, config.mongodb.options);
        this.#db = null;
    }

    async connect() {
        try {
            await this.#client.connect();
            // Send a ping to confirm a successful connection
            const testPing = await this.#client.db('admin').command({ ping: 1 });
            if (!testPing.ok) {
                throw new Error('DB: Ping failed');
            }

            this.#db = this.#client.db(config.mongodb.dbName);
            console.log('DB: Connected');
        } catch (e) {
            console.error('DB error: ' + e);
            await this.#client.close();
        }
    }

    async getInstance() {
        if (!this.#db) {
            await this.connect();
        }

        return this.#db;
    }
}

const mongoSingleton = new MongoSingleton();
export default mongoSingleton;

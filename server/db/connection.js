import { createClient } from 'redis';

class RedisClient {
    #client = null;
    #connected = false;

    constructor() {
        this.#client = createClient({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                database: process.env.REDIS_DB,
            },
        });

        this.#client.on('error', (err) => {
            console.log('Redis error: ', err);
        });
    }

    async connect() {
        try {
            await this.#client.connect();
            console.log('Redis connection successful');
            this.#connected = true;
        } catch (err) {
            console.log('Redis connection error: ', err);
        }
    }

    async getInstance() {
        if (!this.#connected) {
            await this.connect();
        }

        return this.#client;
    }

    async set(key, value) {
        return this.#client.set(key, value);
    }

    async get(key) {
        return this.#client.get(key);
    }
}

export default new RedisClient();
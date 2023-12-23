import { Router } from 'express';
import { isUri } from 'valid-url';
import mongoSingleton from '../../db/mongo-singleton.js';

import generateShortenedHash from '../../utils/generate-shortened-hash.js';

const router = Router();
const mongo = await mongoSingleton.getInstance();

router.post('/shorten', async (req, res) => {
    const { url } = req.body;

    if (!isUri(url)) {
        res.status(400).json({ error: 'Invalid URL' });
        return;
    }

    try {
        const existingURL = await mongo.collection('urls').findOne({ originalUrl: url });
        if (existingURL) {
            res.json({ shortUrl: existingURL.shortUrl });
            return;
        }

        const hash = generateShortenedHash(url);
        const shortUrl = `${req.protocol}://${req.get('host')}/${hash}`;

        await mongo.collection('urls').insertOne({
            originalUrl: url,
            shortUrl: shortUrl,
        });

        res.json({ shortUrl });
    } catch (err) {
        console.error('Error shortening URL:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/expand/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const foundURL = await mongo.collection('urls').findOne({ shortUrl });
        if (foundURL) {
            res.json({ originalUrl: foundURL.originalUrl });
        } else {
            res.status(404).json({ error: 'Shortened URL not found' });
        }
    } catch (err) {
        console.error('Error expanding URL:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
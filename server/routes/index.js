import { Router } from 'express';
import { isUri } from 'valid-url';

import generateUrlCode from '../utils/generate-url-code.js';
import redis from '../db/connection.js';

const router = Router();

const db = await redis.getInstance();

router.get('/:urlCode', async (req, res) => {
    const { urlCode } = req.params;

    try {
        const foundUrl = await db.get(urlCode);
        if (foundUrl) {
            res.status(200).json({ originalUrl: foundUrl });
        } else {
            res.status(404).json({ error: 'Shortened URL not found' });
        }
    } catch (err) {
        console.error('Error expanding URL:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/shorten', async (req, res) => {
    const { url: originalUrl } = req.body;

    if (!isUri(originalUrl)) {
        res.status(400).json({ error: 'Invalid URL' });
        return;
    }

    try {
        const urlCode = generateUrlCode(originalUrl);

        const existingUrl = await db.get(urlCode);
        if (!existingUrl) {
            await db.set(urlCode, originalUrl);
        }

        res.status(200).json({ urlCode });
    } catch (err) {
        console.error('Error shortening URL:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
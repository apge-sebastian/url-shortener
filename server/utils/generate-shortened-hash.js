import { createHash } from 'crypto';

const generateShortenedHash = (url) => {
    const hash = createHash('sha256').update(url).digest('hex');

    return hash.slice(0, 8);
};

export default generateShortenedHash;
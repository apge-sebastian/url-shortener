import { createHash } from 'node:crypto';

function generateUrlCode(url) {
    const hash = createHash('sha256')
        .update(url)
        .digest('hex');
    return hash.slice(0, 6);
}

export default generateUrlCode;
import { Router } from 'express';

import urls from './urls.js';

const router = Router();

router.use('/urls', urls);

export default router;
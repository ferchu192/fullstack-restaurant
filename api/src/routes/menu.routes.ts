import { Router } from 'express';

const router = Router();

router.get('/menu', (req, res) => res.json('getting menu'));

export default router;
import express from 'express';
import user from './v1/user';

const router = express.Router();	// eslint-disable-line new-cap


// mount routes
router.use('/v1/users', user);

export default router;

import express from 'express';
import user from './v1/user';
import auth from './v1/auth';

const router = express.Router();	// eslint-disable-line new-cap


// mount routes
router.use('/v1/users', user);
router.use('/v1/auth', auth);

export default router;

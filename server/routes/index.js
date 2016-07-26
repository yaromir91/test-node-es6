import express from 'express';
import productRoutesV1 from './v1/product';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/v1/products', productRoutesV1);

export default router;

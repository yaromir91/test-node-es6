import express from 'express';
import productRoutes from './product';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
//router.use('/products', productRoutes);

export default router;

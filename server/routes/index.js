import express from 'express';
import productRoutesV1 from './v1/product';
import reviewRoutesV1 from './v1/review';
import _p from './v1/_populate';


const router = express.Router();	// eslint-disable-line new-cap


// mount routes
router.use('/v1/products', productRoutesV1);
router.use('/v1/reviews', reviewRoutesV1);

router.use('/v1/_populate', _p);

export default router;

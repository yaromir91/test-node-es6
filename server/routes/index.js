import express from 'express';
import productRoutesV1 from './v1/product';
import reviewRoutesV1 from './v1/review';
import _p from '../models/_populte';


const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount routes
router.use('/v1/products', productRoutesV1);
router.use('/v1/reviews', reviewRoutesV1);

router.use('/_populate', (req, res) => {
    _p.Band.find().populate('members', '_id band').select('_id name').exec()
        .then((result) => {
            console.log(result);
            res.json(result);
        });
    
});

export default router;

import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import reviewCtrl from '../../controllers/review';

const v1 = express.Router();	// eslint-disable-line new-cap

v1.route('/')
  /** GET /v1/reviews - Get list of reviews */
  .get(reviewCtrl.list);

v1.route('/:reviewId')
  /** GET /v1/reviews/:reviewId - Get review */
  .get(reviewCtrl.get)
    
  .delete(reviewCtrl.removeOne);



/** Load review when API with reviewId route parameter is hit */
v1.param('reviewId', reviewCtrl.load);

export default v1;

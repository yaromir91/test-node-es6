import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import reviewCtrl from '../../controllers/review';
import productCtrl from '../../controllers/product';

const v1 = express.Router();	// eslint-disable-line new-cap

v1.route('/')
  /** GET /v1/reviews - Get list of reviews */
  .get(reviewCtrl.list);

v1.route('/:reviewId')
  /** GET /v1/reviews/:reviewId - Get review */
  .get(reviewCtrl.get)

  /** DELETE /v1/reviews/:reviewId - Delete review */
  .delete(reviewCtrl.remove);

v1.route('/:productId/reviews')

    /** POST /v1/products/:productsId/reviews - Create new review */
    .post(validate(paramValidation.v1.createReview), reviewCtrl.create);


/** Load product when API with productId route parameter is hit */
v1.param('productId', productCtrl.load);
/** Load review when API with reviewId route parameter is hit */
v1.param('reviewId', reviewCtrl.load);

export default v1;

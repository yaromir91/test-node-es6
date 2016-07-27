import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import productCtrl from '../../controllers/product';
import reviewCtrl from '../../controllers/review';

const v1 = express.Router();

v1.route('/')
  /** GET /v1/products - Get list of products */
  .get(productCtrl.list)

  /** POST /v1/products - Create new product */
  .post(validate(paramValidation.v1.createProduct), productCtrl.create);

v1.route('/:productId')
  /** GET /v1/products/:productId - Get product */
  .get(productCtrl.get)

  /** PUT /v1/products/:productId - Update product */
  .put(validate(paramValidation.v1.updateProduct), productCtrl.update)

  /** DELETE /v1/products/:productId - Delete product */
  .delete(productCtrl.remove);

v1.route('/:productId/reviews')
    
    /** POST /v1/products/:productsId/reviews - Create new review */
    .post(validate(paramValidation.v1.createReview), reviewCtrl.create)
    
    /** DELETE /v1/products/:productId/reviews - Delete product */
    .delete(reviewCtrl.removeAll);

v1.route('/:productId/reviews/:reviewId')
    
    /** DELETE /:productId/reviews/:reviewId - Delete product */
    .delete(validate(paramValidation.v1.deleteReview), reviewCtrl.remove);

/** Load product when API with productId route parameter is hit */
v1.param('productId', productCtrl.load);
v1.param('reviewId', reviewCtrl.load);

export default v1;

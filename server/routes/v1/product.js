import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import productCtrl from '../../controllers/product';

const v1 = express.Router();	// eslint-disable-line new-cap

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

/** Load product when API with productId route parameter is hit */
v1.param('productId', productCtrl.load);

export default v1;

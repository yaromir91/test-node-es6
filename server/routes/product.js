import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import productCtrl from '../controllers/product';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
  /** GET /api/products - Get list of products */
  .get(productCtrl.list)

  /** POST /api/products - Create new product */
  //.post(validate(paramValidation.createproduct), productCtrl.create);

router.route('/:productId')
  /** GET /api/products/:productId - Get product */
  .get(productCtrl.get)

  /** PUT /api/products/:productId - Update product */
  //.put(validate(paramValidation.updateproduct), productCtrl.update)

  /** DELETE /api/products/:productId - Delete product */
  .delete(productCtrl.remove);

/** Load product when API with productId route parameter is hit */
router.param('productId', productCtrl.load);

export default router;

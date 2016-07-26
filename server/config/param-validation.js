import Joi from 'joi';
import config from '../config/env';

let validPrice = Joi.string().regex(config.default.validates.v1.product.price).required(),
    strRequired = Joi.string().required();

export default {
  v1: {
    // POST /v1/users
    createProduct: {
      body: {
        name: strRequired,
        description: strRequired,
        price: validPrice
      }
    },

    // UPDATE /v1/products/:productId
    updateProduct: {
      body: {
        name: strRequired,
        description: strRequired,
        price: validPrice
      },
      params: {
        productId: Joi.string().hex().required()
      }
    }
  }
};

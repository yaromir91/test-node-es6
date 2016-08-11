import Joi from 'joi';
import config from '../config/env';

let validPrice = Joi.string().regex(config.default.validates.v1.product.price).required(),
    strRequired = Joi.string().required();

export default {
    v1: {
        // POST /v1/products
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
        },

        // POST /v1/reviews
        createReview: {
            body: {
                description: strRequired
            },
            params: {
                productId: Joi.string().hex().required()
            }
        },

        // POST /v1/products/:productId/reviews/:reviewId
        deleteReview: {
            params: {
                productId: Joi.string().hex().required(),
                reviewId: Joi.string().hex().required()
            }
        },

        checkEmail: {
            body: {
                email: Joi.string().required().email()
            }
        },
        
        resetPassword: {
          body: {
              email: Joi.string().required(),
              password: Joi.string().required(),
              newPassword: Joi.string().required()
          }  
        }

    }
};

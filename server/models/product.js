import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/env'

const SchemaTypes = mongoose.Schema.Types;
require('mongoose-double')(mongoose);

/**
 * Products Schema
 */
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: SchemaTypes.Double,
        required: true,
        match: [config.default.validates.v1.product.price, 'The value of path {PATH} ({VALUE}) is not a valid.']
    },
    reviews: [{
        type: SchemaTypes.ObjectId,
        ref: 'Review'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

ProductSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

ProductSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new APIError('There was a duplicate key error'));
    } else {
        next(error);
    }
});

/**
 * Methods
 */
ProductSchema.method({
});

/**
 * Statics
 */
ProductSchema.statics = {
    /**
     * Get product
     * @param {ObjectId} id - The objectId of product.
     * @returns {Promise<Product, APIError>}
     */
    get(id) {
        return this.findById(id)
            .execAsync().then((product) => {
                if (product) {
                    return product;
                }
                const err = new APIError('No such product exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List products in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of products to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @returns {Promise<Product[]>}
     */
    list({ skip = 0, limit = 50 }) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .execAsync();
    }
};


export default mongoose.model('Product', ProductSchema);

import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/env'

const SchemaTypes = mongoose.Schema.Types;

/**
 * Reviews Schema
 */
const ReviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    product: {
        type: SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
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


/**
 * Methods
 */
ReviewSchema.method({
});

/**
 * Statics
 */
ReviewSchema.statics = {
    /**
     * Get product
     * @param {ObjectId} id - The objectId of product.
     * @returns {Promise<Review, APIError>}
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
     * @returns {Promise<Review[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .populate('product', 'name -_id')
            .sort({ createdAt: -1 })
            .skip(Number(skip))
            .limit(Number(limit))
            .select('-__v')
            .execAsync();
    }
};


export default mongoose.model('Review', ReviewSchema);

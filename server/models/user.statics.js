import httpStatus from 'http-status';
import crypto from 'crypto';
import { saldo } from './user'
import APIError from '../helpers/APIError';

export default {
    /**
     * Generate hash
     * @param string
     * @returns {*}
     */
    cryptoGenerate(string){
        return crypto.createHash('md5').update(string+saldo).digest("hex");
    },
    
    /**
     * Get users
     * @param {ObjectId} id - The objectId of users.
     * @returns {Promise<Product, APIError>}
     */
    get(id) {
        const error = Promise.reject(new APIError('No such users exists!', httpStatus.NOT_FOUND));
        return this.findById(id)
            .exec().then((users) => {
                if (users !== null) {
                    return users;
                }
                return error;
            }).catch(function () {
                return error;
            });
    },
    
    getByEmailToken(emailToken){
        const error = Promise.reject(new APIError('The lifetime token expired!', httpStatus.NOT_FOUND));
        return this.findOne()
            .where({emailToken: emailToken})
            .exec().then((users) => {
                if (users !== null) {
                    return users;
                }
                return error;
            }).catch(function () {
                return error;
            });
    },

    /**
     * List products in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of products to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @returns {Promise<Product[]>}
     */
    list({ skip = 0, limit = 50 }) {
        return this.find({})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .exec();
    }
}

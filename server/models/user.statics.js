import httpStatus from 'http-status';
import crypto from 'crypto';
import { saldo } from './user'

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
        return this.findById(id)
            .exec().then((users) => {
                if (users == null) {
                    return users;
                }
                const err = new APIError('No such users exists!', httpStatus.NOT_FOUND);
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
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .exec();
    }
}

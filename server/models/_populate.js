import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/env'
import shortid from 'shortid'


const PersonSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    }
});

const BandSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

BandSchema.virtual('members', {
    ref: 'Person', // The model to use
    localField: 'id', // Find people where `localField`
    foreignField: 'id' // is equal to `foreignField`
});

BandSchema.virtual('virtual_name').get(function () {
    return this.name + ' virtual'
});

PersonSchema.statics = {
    /**
     * Get person
     * @param {ObjectId} id - The objectId of product.
     * @returns {Promise<Person, APIError>}
     */
    get(id) {
        return this.findById(id)
            .execAsync().then((person) => {
                if (person) {
                    return person;
                }
                const err = new APIError('No such person exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    }
};

BandSchema.statics = {
    /**
     * Get person
     * @param {ObjectId} id - The objectId of product.
     * @returns {Promise<Person, APIError>}
     */
    get(id) {
        return this.findById(id)
            .execAsync().then((person) => {
                if (person) {
                    return person;
                }
                const err = new APIError('No such band exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    }
};

var Person = mongoose.model('Person', PersonSchema);
var Band = mongoose.model('Band', BandSchema);


export default {Person, Band};
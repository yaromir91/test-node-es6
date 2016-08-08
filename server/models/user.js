import mongoose from 'mongoose';
import httpStatus from 'http-status';
import statics from './user.statics';
import mValidator from 'mongoose-validator';
import crypto from 'crypto';
import _ from 'lodash'
import APIError from '../helpers/APIError';

const saldo = 'A5f$G&s';

export const consts = {
    STATUS: {
        ACTIVE: 'ACTIVE',
        DISABLED: 'DISABLED',
        PERSONAL_INFO_NOT_VERIFIED: 'PERSONAL_INFO_NOT_VERIFIED'
    }
};

/**
 * Users Schema
 */
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true,
        validate: [mValidator({validator: 'isEmail'})]
    },
    twitterUid: {
      type: String   
    },
    facebookUid: {
      type: String   
    },
    phone: {
        type: String,
        index: true,
        required: true,
        trim: true,
        validate: [mValidator({validator: 'isNumeric'})]
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    token: {
        type: String,
        default: function () {
            return this.cryptoGenerate('1')
        }
    },
    status: {
        type: String,
        trim: true,
        uppercase: true,
        default: consts.STATUS.PERSONAL_INFO_NOT_VERIFIED,
        enum: _.values(consts.STATUS)
    },
    isProfessinalUser: {
        type: Boolean,
        default: false
    },
    lastLoginDatetime: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date

});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('update', function () {
    this.update({}, {$set: {updatedAt: new Date()}});
});

UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
    this.update({}, {$set: {updatedAt: new Date()}});
    next();
});

UserSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new APIError('User is exists!', 500, true));
    } else {
        next(error);
    }
});

/**
 * Methods
 */
UserSchema.method({
    cryptoGenerate: statics.cryptoGenerate
});

/**
 * Statics
 */
UserSchema.statics = statics;

export default mongoose.model('User', UserSchema);
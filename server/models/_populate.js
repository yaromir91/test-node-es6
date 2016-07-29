import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/env'
import shortid from 'shortid'


var PersonSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate
    },
    name: String
});

var BandSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: String
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

var Person = mongoose.model('Person', PersonSchema);
var Band = mongoose.model('Band', BandSchema);


export default {Person, Band};
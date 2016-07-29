import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/env'



var PersonSchema = new mongoose.Schema({
    name: String,
    band: String
}, {
    toObject: {
        virtuals: true
    }
});

var BandSchema = new mongoose.Schema({
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
    localField: 'name', // Find people where `localField`
    foreignField: 'band' // is equal to `foreignField`
});

BandSchema.virtual('virtual_name').get(function () {
    return this.name + ' virtual'
});

var Person = mongoose.model('Person', PersonSchema);
var Band = mongoose.model('Band', BandSchema);

function create({bandName = 2}) {
    let person = {
            name: 'Piter' + new Date(),
            band: `Test_${bandName}` 
        },
        band = {
            name: `Test_${bandName}`
        };

    let personS = new Person(person);
    personS.save(function (err, sPerson) {
        let bandS = new Band(band);
        bandS.save(function (err, sBand) {
            console.log(sBand);
        });
    });
}



export default { Person, Band, create};
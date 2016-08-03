import _p from '../models/_populate';
import _ from 'lodash';

function load() {
    return {
        person(req, res, next, id) {
            _p.Person.get(id).then((person) => {
                req.person = person;
                return next();
            }).error((e) => next(e));
        },
        band(req, res, next, id) {
            _p.Band.get(id).then((band) => {
                req.band = band;
                return next();
            }).error((e) => next(e));
        }
    }
}

function create(req, res, next) {

    const person = {
            name: req.body.name,
            band: req.body.band
        };

    const personS = new _p.Person(person);
    personS.saveAsync()
        .then((sPerson) => {
            let bandS = new _p.Band({id: sPerson.id, name: req.body.name});
            bandS.saveAsync()
            .then((sBand) => res.json(sBand));
        }).error((e) => next(e));
}

function update() {
    return {
        person(req, res, next){
            let person = req.person;
            person = _.merge(person, req.body)
            person.saveAsync(req.body)
                .then((savePerson) => res.json(savePerson))
                .error((e) => next(e));
        },
        band(req, res, next){
            let band = req.band;
            band = _.merge(band, req.body);
            band.saveAsync()
                .then((saveBand) => res.json(saveBand))
                .error((e) => next(e));
        }
    }
}


function list(req, res, next) {
    _p.Band.find()
        .populate('members', '-__v')
        .execAsync()
        .then((result) => {
            res.json(result);
        });

}


export default {create, update, list, load};

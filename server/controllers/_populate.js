import _p from '../models/_populate';

function load() {
    return {
        person(req, res, next, id) {
            _p.Person.findOne({id}).execAsync().then((person) => {
                req.person = person;
                return next();
            }).error((e) => next(e));
        },
        band(req, res, next, id) {
            _p.Band.findOne({id}).execAsync().then((band) => {
                req.band = band;
                return next();
            }).error((e) => next(e));
        }
    }
}

function create(req, res, next) {

    let person = {
            name: req.body.name,
            band: req.body.band
        };

    let personS = new _p.Person(person);
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
            console.log(person);
            person.id = 'S1hufyt_';
            person.saveAsync()
            .then((savePerson) => res.json(savePerson))
            .error((e) => next(e));
        },
        band(req, res, next){
            let band = req.band;
            band.id = 'BkLOzyYd';
            band.saveAsync()
                .then((saveBand) => res.json(saveBand))
                .error((e) => next(e));
        }
    }
}


function list(req, res, next) {
    _p.Band.find().populate('members', '-_id -__v')
        .execAsync()
        .then((result) => {
            res.json(result);
        }).error((e) => next(e));

}


export default {create, update, list, load};

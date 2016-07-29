import express from 'express';
import _pCtrl from '../../controllers/_populate'


let v1 = express.Router();

/** GET /v1/_populate */
v1.route('/')
    .get(_pCtrl.list)
    .post(_pCtrl.create);

/** PUT /v1/_populate/person/:personId */
v1.route('/person/:personId')
    .put(_pCtrl.update().person);

/** PUT /v1/_populate/band/:bandId */
v1.route('/band/:bandId')
    .put(_pCtrl.update().band);

v1.param('personId', _pCtrl.load().person);
v1.param('bandId', _pCtrl.load().band);
export default v1
import express from 'express';
import UserCtrl from '../../controllers/user';
import AuthCtrl from '../../controllers/auth';


const v1 = express.Router();

v1.route('/activate/:emailToken')
    /** GET /v1/auth/activate/:emailToken - Get list of users */
    .get(UserCtrl.activateAccount);


v1.route('/twitter')
    .get(AuthCtrl.loginByTwitter);

v1.param('emailToken', UserCtrl.getUserByEmailToken);

export default v1;

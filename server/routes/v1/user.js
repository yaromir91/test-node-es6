import express from 'express';
import UserCtrl from '../../controllers/user';
import eValidator from 'express-validation';
import paramValidate from '../../config/param-validation';

const v1 = express.Router();

v1.route('/')
  /** GET /v1/users - Get list of users */
  .get(UserCtrl.list)

  /** POST /v1/users - Create new user */
  .post(UserCtrl.create);

v1.route('/:userId')
  /** GET /v1/users/:userId - Get user */
  .get(UserCtrl.get)

  /** PUT /v1/users/:userId - Update user */
  .put(UserCtrl.update)

  /** DELETE /v1/users/:userId - Delete user */
  .delete(UserCtrl.remove);

v1.route('/forgot_password')
    
    .post(eValidator(paramValidate.v1.checkEmail), UserCtrl.forgotPassword);

v1.route('/reset_password')
    
    .post(eValidator(paramValidate.v1.resetPassword), UserCtrl.resetPassword);


/** Load user when API with userId route parameter is hit */
v1.param('userId', UserCtrl.load);

export default v1;

import express from 'express';
import UserCtrl from '../../controllers/user';

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


/** Load user when API with userId route parameter is hit */
v1.param('userId', UserCtrl.load);

export default v1;

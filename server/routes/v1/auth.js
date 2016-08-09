import express from 'express';
import UserCtrl from '../../controllers/user';

const v1 = express.Router();

v1
  /** GET /v1/users - Get list of users */
  .get('/', UserCtrl.activateAccount);


export default v1;

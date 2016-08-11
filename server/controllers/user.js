import User, { consts } from '../models/user';
import _ from 'lodash';
import APIError from '../helpers/APIError'
import email from '../helpers/email.service';
import eValidator from 'express-validation';

/**
 * Load User and append to req.
 */

export default new class UserController {
    /**
     * Get user by id
     * @param req
     * @param res
     * @param next
     * @param id
     */
    load(req, res, next, id) {
        User.get(id).then((User, err) => {
            req.user = User;
            return next();
        }).catch((err) => {
            return next(err);
        });
    }

    /**
     * Get user by emailToken
     */
    getUserByEmailToken(req, res, next, emailToken) {
        User.getByEmailToken(emailToken).then((User, err) => {
            req.user = User;
            return next();
        }).catch((err) => {
            return next(err);
        });
    }

    /**
     * Get User
     * @returns {User}
     */
    get(req, res) {
        return res.json(req.user);
    }

    /**
     * Create new User
     * @property {string} req.body.name - The name of User.
     * @property {string} req.body.price - The price of User.
     * @returns {User}
     */
    create(req, res, next) {

        let user = new User({
            email: req.body.email,
            phone: req.body.phone,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: req.body.displayName,
            password: req.body.password ? User.cryptoGenerate(req.body.password) : undefined
        });


        user.save((err, user) => {
            if (err) {
                next(err);
            } else {
                email.registrationEmail({email: user.email, token: user.emailToken}, (errEmail) => {
                    if (errEmail) next(errEmail);
                    res.json(user);
                })
            }
        })
    }

    /**
     * Update existing User
     * @property {string} req.body.Username - The Username of User.
     * @property {string} req.body.mobileNumber - The mobileNumber of User.
     * @returns {User}
     */
    update(req, res, next) {

        const User = req.user;
        _.map(req.body, (value, field) => {
            User[field] = value
        });
        User.save((err, user) => {
            if (err) {
                next(err);
            } else {
                res.json(user);
            }
        })
    }

    /**
     * Get User list.
     * @property {number} req.query.skip - Number of Users to be skipped.
     * @property {number} req.query.limit - Limit number of Users to be returned.
     * @returns {User[]}
     */
    list(req, res, next) {
        const { limit = 50, skip = 0 } = req.query;
        User.list({limit, skip}).then((Users) => res.json(Users)).catch((e) => next(e));
    }

    /**
     * Delete User.
     * @returns {User}
     */
    remove(req, res, next) {
        let user = req.user;
        user.remove((err, removeUser) => {
            res.json(removeUser)
        })
    }

    /**
     * Activate user account
     * @param req
     * @param res
     * @param next
     * @param emailToken
     */
    activateAccount(req, res, next) {
        let user = req.user;
        user.set({emailToken: '', status: consts.STATUS.ACTIVE});
        user.save((err, user) => {
            if (err) {
                next(err)
            } else {
                res.json(user);
            }
        })
    }

    /**
     * Forgot password
     * @param req
     * @param res
     * @param next
     */
    forgotPassword(req, res, next) {

        User.getByEmail(req.body.email)
            .then((user, err) => {
                if (err)
                    next(err);
                else {
                    
                    let newPass = `${Date.now()}`.substr(0,6),
                        pass = User.cryptoGenerate(newPass);
                    user.password = pass;
                    user.save((err, user) => {
                        if (err) next(err);
                        else {
                            email.forgetPassword({email: user.email, newPassword: newPass}, (err) => {
                                if (err)
                                    next(new APIError(err))
                                else {
                                    res.status(204).json()
                                }
                            })
                        }
                    })
                }

            }).catch((e) => next(e));
    }

    resetPassword(req, res, next) {
        User.getByEmail(req.body.email)
            .then((user, err) => {
                if (err)
                    next(err);
                else {
                    user.comparePassword(req.body.password, (err) => {
                        if (err)
                            next(err);
                        else {
                            user.password = User.cryptoGenerate(req.body.newPassword);
                            user.save((err, user) => {
                                if (err) {
                                    next(err)
                                } else {
                                    res.json(user);
                                }
                            })
                        }
                    })
                }
            });
    }
}
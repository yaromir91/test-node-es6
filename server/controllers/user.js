import User from '../models/user';

/**
 * Load User and append to req.
 */
function load(req, res, next, id) {
    console.log('load')
    User.get(id).then((User, err) => {
        req.user = User;
        console.log(User, err, '<<<<');
        if (err) {
            return next(err);
        } else {
            return next();
        }
    });
}

/**
 * Get User
 * @returns {User}
 */
function get(req, res) {
    return res.json(req.user);
}

/**
 * Create new User
 * @property {string} req.body.name - The name of User.
 * @property {string} req.body.price - The price of User.
 * @returns {User}
 */
function create(req, res, next) {

    let user = new User({
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        displayName: req.body.display_name,
        password: User.cryptoGenerate(req.body.password),
    });

    user.save((err, user) => {
        if (err) {
            next(err);
        } else {
            res.json(user);
        }
    })
}

/**
 * Update existing User
 * @property {string} req.body.Username - The Username of User.
 * @property {string} req.body.mobileNumber - The mobileNumber of User.
 * @returns {User}
 */
function update(req, res, next) {
    const User = req.user;
    User.email = req.body.email;
    User.phone = req.body.phone;
    User.firstName = req.body.first_name;
    User.lastName = req.body.last_name;
    User.displayName = req.body.display_name;

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
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({limit, skip}).then((Users) => res.json(Users))
}

/**
 * Delete User.
 * @returns {User}
 */
function remove(req, res, next) {
    let user = req.user;
    user.remove((err, removeUser) => {
        console.log(err, removeUser);
        //if (err) {
        //    next(err);
        //} else {
        //    res.json(removeUser);
        //}
        res.json([])
    })
}

export default {load, get, create, update, list, remove};

import User, { consts } from '../models/user';
import _ from 'lodash';
import APIError from '../helpers/APIError'
import passport from 'passport';
import Twitter from 'node-twitter-api';

let _requestSecret = null;

export default new class AuthController {


    login(req, res) {
        res.end();
    }

    loginByTwitter(req, res, next) {
        const requestToken = req.query.oauth_token,
                verifier = req.query.oauth_verifier,
                twitter = new Twitter({
                    consumerKey: 'gyWX6LNGzu4rFql3P8g4RxPWl',
                    consumerSecret: 'MLgxThig1ytEtAa21PyDwGozkZHppCH0YzzouWfKaRdGqEaBey',
                    callback: 'http://localhost:3000/v1/auth/twitter'
                });
        if (!requestToken && !verifier) {
            twitter.getRequestToken(function (err, requestToken, requestSecret) {
                if (err)
                    next(err);
                else {
                    _requestSecret = requestSecret;
                    console.log(_requestSecret);
                    res.json({ redirect : `https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`});
                }
            });
        } else {
            twitter.getAccessToken(requestToken, _requestSecret, verifier, function (err, accessToken, accessSecret) {
                if (err)
                    res.status(500).send(err);
                else
                    twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
                        if (err)
                            next(err);
                        else
                            res.send(user);
                    });
            });
        }
    }
}
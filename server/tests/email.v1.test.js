import request from 'supertest-as-promised';
import chai from 'chai';
import { assert } from 'chai';
import app from '../index';
import mailer from '../helpers/email.service';
import config from '../config/env';

chai.config.includeStack = true;

describe('mailer: service', function () {


    describe('#sendOne()', function (done) {


        it('should registration confirm', function (done) {
            var locals = {
                email: "yaromir91@gmail.com",
                token: Date.now(),
                subject: "Registration Activate"
            };

            mailer.registrationEmail(locals, function (err, responseStatus, html, text) {
                assert.isNull(err);
                assert.isNull(text)
                assert.match(html, new RegExp(locals.token));
                done();
            });
        });

        it('should forgot password', function (done) {
            var locals = {
                email: 'yaromir91@gmail.com',
                newPassword: 'qwe123',
                subject: "Forgot Password"
            };

            mailer.forgetPassword(locals, function (err, responseStatus, html, text) {
                assert.isNull(err);
                assert.isNull(text)
                assert.match(html, new RegExp(locals.newPassword));
                done();
            });
        });
        
    });


});
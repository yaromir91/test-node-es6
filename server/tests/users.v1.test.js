import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { assert } from 'chai';
import app from '../index';

chai.config.includeStack = true;

describe('## User APIs', () => {
    let user = {
        "password": "test",
        "lastName": "test",
        "firstName": "test",
        "phone": "1111111111",
        "email": "test@test.test"
    };

    describe('# GET /v1/users', () => {
        it('should create a new user', (done) => {
            request(app)
                .get('/v1/users')
                .expect(httpStatus.OK)
                .then(res => {
                    assert.isArray(res.body);
                    done();
                });
        });
    });
    
    
    describe('# POST /v1/users', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/v1/users')
                .send(user)
                .expect(httpStatus.OK)
                .then(res => {
                    assert.equal(res.body.email, user.email);
                    user = res.body;
                    done();
                });
        });
    });

    describe('# GET /v1/users/:userId', () => {
        it('should get user details', (done) => {
            request(app)
                .get(`/v1/users/${user._id}`)
                .expect(httpStatus.OK)
                .then(res => {
                    user = res.body;
                    done();
                });
        });

        it('should report error with message - Not found, when user does not exists', (done) => {
            request(app)
                .get('/v1/users/56c787ccc67fc16ccc1a5e92')
                .expect(httpStatus.NOT_FOUND)
                .then(res => {
                    assert.equal(res.body.email, undefined);
                    done();
                });
        });
    });

    describe('# PUT /v1/users/:userId', () => {
        it('should update user details', (done) => {
            request(app)
                .put(`/v1/users/${user._id}`)
                .send({lastName: 'test 1'})
                .expect(httpStatus.OK)
                .then(res => {
                    assert.equal(res.body.lastName, 'test 1');
                    done();
                });
        });
    });


    describe('# DELETE /v1/users/:userId', () => {
        it('should remove a review in the user', (done) => {
            request(app)
                .delete(`/v1/users/${user._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    console.log(res.body);
                    assert.equal(res.body._id, user._id);
                    done();
                })

        });

    });

});

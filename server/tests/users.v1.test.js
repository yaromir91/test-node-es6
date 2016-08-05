import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;

describe('## User APIs', () => {
    let user = {
        name: 't-short as8',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut autem, consequuntur cum dignissimos dolor dolore dolorum, eum ipsam nesciunt nulla omnis, perspiciatis porro possimus quae sapiente velit veniam vitae!',
        price: '1000.00'
    };
    
    describe('# POST /v1/users', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/v1/users')
                .send(user)
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.name).to.equal(user.name);
                    expect(res.body.description).to.equal(user.description);
                    expect(res.body.price).to.equal(user.price);
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
                    expect(res.body.name).to.equal(user.name);
                    expect(res.body.description).to.equal(user.description);
                    expect(res.body.price).to.equal(user.price);
                    user = res.body;
                    done();
                });
        });

        it('should report error with message - Not found, when user does not exists', (done) => {
            request(app)
                .get('/v1/users/56c787ccc67fc16ccc1a5e92')
                .expect(httpStatus.NOT_FOUND)
                .then(res => {
                    expect(res.body.description).to.equal(undefined);
                    done();
                });
        });
    });

    describe('# PUT /v1/users/:userId', () => {
        it('should update user details', (done) => {
            request(app)
                .put(`/v1/users/${user._id}`)
                .send(user)
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.name).to.equal('t-short as8');
                    expect(res.body.price).to.equal(user.price);
                    done();
                });
        });
    });

    describe('# GET /v1/users/', () => {
        it('should get all users', (done) => {
            request(app)
                .get('/v1/users')
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body[0].reviews).to.be.an('array');
                    expect(res.body[0].reviews).to.be.have.length(1);
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
                    expect(res.body._id).to.equal(review._id);
                    expect(res.body.user).to.equal(user._id);
                    done();
                })

        });

    });

    describe('# DELETE /v1/users/', () => {
        it('should delete user', (done) => {
            request(app)
                .delete(`/v1/users/${user._id}`)
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.name).to.equal('t-short as8');
                    expect(res.body.price).to.equal(user.price);
                    done();
                });
        });
    });
});

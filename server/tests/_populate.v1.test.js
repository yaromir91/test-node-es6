import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { assert } from 'chai';
import app from '../index';

chai.config.includeStack = true;

let person = {
    name: 'Bob'
};

let band = {};

describe('#Custom populate', () => {

    describe('GET /v1/_populate/', () => {


        it('should get list populate', (done) => {
            request(app)
                .get('/v1/_populate')
                .expect(httpStatus.OK)
                .then(res => {
                    assert.isArray(res.body);
                    done();
                });
        });
        
        it('should get list populate', (done) => {
            request(app)
                .get('/v1/_populate')
                .expect(httpStatus.OK)
                .then(res => {
                    assert.isArray(res.body);
                    done();
                });
        });

        it('should create person and band ', (done) => {
            request(app)
                .post('/v1/_populate')
                .send(person)
                .expect(httpStatus.OK)
                .then(res => {
                    assert.equal(res.body.name, person.name);
                    done();
                });
        });
        
        it('should create person and band with error', (done) => {
            request(app)
                .post('/v1/_populate')
                .send({})
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then(res => {
                    done();
                });
        });
        
        it('should get all ', (done) => {
            request(app)
                .get('/v1/_populate')
                .expect(httpStatus.OK)
                .then(res => {
                    assert.isArray(res.body);
                    band = res.body[0];
                    done();
                });
        });
        
        it('should update person', (done) => {
            request(app)
                .put(`/v1/_populate/person/${band.members[0]._id}`)
                .send({name: 'Bob7'})
                .expect(httpStatus.OK)
                .then(res => {
                    assert.notEqual(res.body.name, person.name);
                    done();
                });
        
        });
        
        it('should update person with error', (done) => {
            request(app)
                .put(`/v1/_populate/person/57a07262bf4c2ffe065839a6`)
                .send({name: ''})
                .expect(httpStatus.NOT_FOUND)
                .then(res => {
                    assert.equal(res.body.message, 'Not Found');
                    done();
                });
        
        });

        it('should update person with validate error', (done) => {
            request(app)
                .put(`/v1/_populate/person/${band.members[0]._id}`)
                .send({name: ''})
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then(res => {
                    done();
                });

        });

        it('should update band', (done) => {
            request(app)
                .put(`/v1/_populate/band/${band._id}`)
                .send({name: 'Band1' + new Date().getTime()})
                .expect(httpStatus.OK)
                .then(res => {
                    assert.notEqual(res.body.name, band.name);
                    done();
                });

        });

        it('should update band with error', (done) => {
            request(app)
                .put(`/v1/_populate/band/57a07262bf4c2ffe065839a1`)
                .expect(httpStatus.NOT_FOUND)
                .then(res => {
                    assert.equal(res.body.message, 'Not Found');
                    done();
                });

        });
        
        it('should update band with validate error next(e)', (done) => {
            request(app)
                .put(`/v1/_populate/band/${band._id}`)
                .send({name: ''})
                .expect(httpStatus.INTERNAL_SERVER_ERROR)
                .then(res => {
                    done();
                });

        });
    });
    
    
});

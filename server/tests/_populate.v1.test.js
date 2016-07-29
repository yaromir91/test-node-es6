import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;

let person = {
    name: 'Bob'
};

describe('## Custom populate', () => {

    describe('# GET /v1/_populate/', () => {
        
        it('should get all ', (done) => {
            request(app)
                .get('/v1/_populate')
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
    
    
    
    //describe('# create person with band', () => {
    //
    //    describe('# POST /v1/_populate/person', () => {
    //        it('should create a new person', (done) => {
    //            request(app)
    //                .post('/v1/_populate')
    //                .send(person)
    //                .expect(httpStatus.OK)
    //                .then(res => {
    //                    expect(res.body.name).to.equal(product.name);
    //                    person = res.body;
    //                    done();
    //                });
    //        });
    //    });
    //
    //
    //    describe('# POST /v1/products/:productsId/reviews', () => {
    //        
    //        it('should create a new review for current products', (done) => {
    //            request(app)
    //                .post(`/v1/products/${product._id}/reviews`)
    //                .send(review)
    //                .expect(httpStatus.OK)
    //                .then((res) => {
    //                    expect(res.body.description).to.equal(review.description);
    //                    expect(res.body.product).to.equal(product._id);
    //                    review = res.body;
    //                    done();
    //                })
    //        })
    //    });
    //    
    //    describe('# GET /v1/reviews/:reviewId', () => {
    //        
    //        it('should get review details', (done) => {
    //            request(app)
    //                .get(`/v1/reviews/${review._id}`)
    //                .expect(httpStatus.OK)
    //                .then(res => {
    //                    expect(res.body.description).to.equal(review.description);
    //                    expect(res.body.product).to.equal(review.product);
    //                    review = res.body;
    //                    done();
    //                });
    //        });
    //
    //        it('should report error with message - Not found, when review does not exists', (done) => {
    //            request(app)
    //                .get('/v1/reviews/56c787ccc67fc16ccc1a5e92')
    //                .expect(httpStatus.NOT_FOUND)
    //                .then(res => {
    //                    expect(res.body.description).to.equal(undefined);
    //                    done();
    //                });
    //        });
    //    });
    //
    //    describe('# DELETE /v1/products/:productsId/reviews/ ', () => {
    //        it('should remove a all review in the product', (done) => {
    //            request(app)
    //                .delete(`/v1/products/${product._id}/reviews`)
    //                .expect(httpStatus.OK)
    //                .then((res) => {
    //                    expect(res.body.ok).to.equal(1);
    //                    done();
    //                })
    //
    //        });
    //
    //    });
    //
    //    describe('# DELETE /v1/products/', () => {
    //        it('should delete product', (done) => {
    //            request(app)
    //                .delete(`/v1/products/${product._id}`)
    //                .expect(httpStatus.OK)
    //                .then(res => {
    //                    expect(res.body.name).to.equal('t-short 111');
    //                    expect(res.body.price).to.equal(product.price);
    //                    done();
    //                });
    //        });
    //    });
    //});


});

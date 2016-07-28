import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;

describe('## Review APIs', () => {

    let review = {
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam cupiditate fugiat possimus quam. Aliquid animi aperiam assumenda at, commodi, consequuntur, eaque enim esse eum facilis hic illo laboriosam maiores molestiae natus officia omnis quisquam repellat repellendus totam. Amet corporis distinctio eligendi eos fugit, neque non odio, optio perferendis, placeat qui repellendus sequi veritatis! Accusantium adipisci culpa dolore eaque eius illo laborum magnam maxime modi nemo nihil nostrum perspiciatis provident quam, qui rem rerum sed tempora voluptates voluptatum! Aperiam beatae cumque eius excepturi fugit inventore magni pariatur, quasi qui quibusdam, sequi soluta vero. Molestias, nobis, quos! Animi dolores exercitationem nihil!'
        },
        product = {
            name: 't-short 111',
            description: 'Amet aut autem, consequuntur cum dignissimos dolor dolore dolorum, eum ipsam nesciunt nulla omnis, perspiciatis porro possimus quae sapiente velit veniam vitae!',
            price: '10.23'
        };

    describe('# GET /v1/reviews/', () => {
        
        it('should get all reviews', (done) => {
            request(app)
                .get('/v1/reviews')
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
    
    
    
    describe('# Get details review', () => {

        describe('# POST /v1/products', () => {
            it('should create a new product', (done) => {
                request(app)
                    .post('/v1/products')
                    .send(product)
                    .expect(httpStatus.OK)
                    .then(res => {
                        expect(res.body.name).to.equal(product.name);
                        expect(res.body.description).to.equal(product.description);
                        expect(res.body.price).to.equal(product.price);
                        product = res.body;
                        done();
                    });
            });
        });


        describe('# POST /v1/products/:productsId/reviews', () => {
            
            it('should create a new review for current products', (done) => {
                request(app)
                    .post(`/v1/products/${product._id}/reviews`)
                    .send(review)
                    .expect(httpStatus.OK)
                    .then((res) => {
                        expect(res.body.description).to.equal(review.description);
                        expect(res.body.product).to.equal(product._id);
                        review = res.body;
                        done();
                    })
            })
        });
        
        describe('# GET /v1/reviews/:reviewId', () => {
            
            it('should get review details', (done) => {
                request(app)
                    .get(`/v1/reviews/${review._id}`)
                    .expect(httpStatus.OK)
                    .then(res => {
                        expect(res.body.description).to.equal(review.description);
                        expect(res.body.product).to.equal(review.product);
                        review = res.body;
                        done();
                    });
            });
    
            it('should report error with message - Not found, when review does not exists', (done) => {
                request(app)
                    .get('/v1/reviews/56c787ccc67fc16ccc1a5e92')
                    .expect(httpStatus.NOT_FOUND)
                    .then(res => {
                        expect(res.body.description).to.equal(undefined);
                        done();
                    });
            });
        });

        describe('# DELETE /v1/products/:productsId/reviews/ ', () => {
            it('should remove a all review in the product', (done) => {
                request(app)
                    .delete(`/v1/products/${product._id}/reviews`)
                    .expect(httpStatus.OK)
                    .then((res) => {
                        expect(res.body.ok).to.equal(1);
                        done();
                    })

            });

        });

        describe('# DELETE /v1/products/', () => {
            it('should delete product', (done) => {
                request(app)
                    .delete(`/v1/products/${product._id}`)
                    .expect(httpStatus.OK)
                    .then(res => {
                        expect(res.body.name).to.equal('t-short 111');
                        expect(res.body.price).to.equal(product.price);
                        done();
                    });
            });
        });
    });


});

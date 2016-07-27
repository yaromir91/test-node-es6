import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;

describe('## Product APIs', () => {
  let product = {
    name: 't-short as8',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut autem, consequuntur cum dignissimos dolor dolore dolorum, eum ipsam nesciunt nulla omnis, perspiciatis porro possimus quae sapiente velit veniam vitae!',
    price: '1000.00'
  };

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

  describe('# GET /v1/products/:productId', () => {
    it('should get product details', (done) => {
      request(app)
        .get(`/v1/products/${product._id}`)
        .expect(httpStatus.OK)
        .then(res => {
            expect(res.body.name).to.equal(product.name);
            expect(res.body.description).to.equal(product.description);
            expect(res.body.price).to.equal(product.price);
            product = res.body;
            done();
        });
    });
  
    it('should report error with message - Not found, when product does not exists', (done) => {
      request(app)
        .get('/v1/products/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.description).to.equal('Not Found');
          done();
        });
    });
  });
  
  describe('# PUT /v1/products/:productId', () => {
    it('should update product details', (done) => {
      product.username = 'KK';
      request(app)
        .put(`/v1/products/${product._id}`)
        .send(product)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('t-short as8');
          expect(res.body.price).to.equal(product.price);
          done();
        });
    });
  });
  
  describe('# GET /v1/products/', () => {
    it('should get all products', (done) => {
      request(app)
        .get('/v1/products')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to. be.an('array');
          done();
        });
    });
  });
  
  describe('# DELETE /v1/products/', () => {
    it('should delete product', (done) => {
      request(app)
        .delete(`/v1/products/${product._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('t-short as8');
          expect(res.body.price).to.equal(product.price);
          done();
        });
    });
  });
});

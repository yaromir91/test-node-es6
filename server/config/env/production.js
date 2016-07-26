export default {
  env: 'production',
  db: 'mongodb://localhost/express-mongoose-es6-rest-api-production',
  port: 3000,

  validates: {
    v1: {
      product: {
        price: /(\d+(\.?\d+)?)$/
      }
    }
  }
};

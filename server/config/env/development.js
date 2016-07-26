export default {
  env: 'development',
  db: 'mongodb://localhost/artjoke-test-es6',
  port: 3000,
  
  validates: {
    v1: {
      product: {
        price: /(\d+(\.?\d+)?)$/
      }
    }
  }
};

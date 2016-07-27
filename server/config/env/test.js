export default {
  env: 'test',
  db: 'mongodb://localhost/artjoker-test-unit',
  port: 3030,

  validates: {
    v1: {
      product: {
        price: /(\d+(\.?\d+)?)$/
      }
    }
  }
};

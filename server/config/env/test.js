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
  },

  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL 
    auth: {
      user: 'yaromir.artjoker@gmail.com',
      pass: 'yaromir7982741'
    },
    from: 'Developer <developer@dev.com>'
  },
  host: `http://localhost:3000/`
};

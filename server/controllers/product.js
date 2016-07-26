import Product from '../models/product';

/**
 * Load Product and append to req.
 */
function load(req, res, next, id) {
  Product.get(id).then((Product) => {
    req.product = Product;
    return next();
  }).error((e) => next(e));
}

/**
 * Get Product
 * @returns {Product}
 */
function get(req, res) {
  return res.json(req.product);
}

/**
 * Create new Product
 * @property {string} req.body.name - The name of Product.
 * @property {string} req.body.price - The price of Product.
 * @returns {Product}
 */
function create(req, res, next) {
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

  product.saveAsync()
    .then((savedProduct) => res.json(savedProduct))
    .error((e) => next(e));
}

/**
 * Update existing Product
 * @property {string} req.body.Productname - The Productname of Product.
 * @property {string} req.body.mobileNumber - The mobileNumber of Product.
 * @returns {Product}
 */
function update(req, res, next) {
  const Product = req.product;
  Product.name = req.body.name;
  Product.description = req.body.description;
  Product.price = req.body.price;

  Product.saveAsync()
    .then((savedProduct) => res.json(savedProduct))
    .error((e) => next(e));
}

/**
 * Get Product list.
 * @property {number} req.query.skip - Number of Products to be skipped.
 * @property {number} req.query.limit - Limit number of Products to be returned.
 * @returns {Product[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip }).then((Products) => res.json(Products))
    .error((e) => next(e));
}

/**
 * Delete Product.
 * @returns {Product}
 */
function remove(req, res, next) {
  let product = req.product;
  product.removeAsync()
    .then((deletedProduct) => res.json(deletedProduct))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };

import Review from '../models/review';
import Product from '../models/product';
import _ from 'lodash' 

/**
 * Load Review and append to req.
 */
function load(req, res, next, id) {
  Review.get(id).then((Review) => {
    req.review = Review;
    return next();
  }).error((e) => next(e));
}

/**
 * Get Review
 * @returns {Review}
 */
function get(req, res) {
  return res.json(req.review);
}

/**
 * Create new Review
 * @property {string} req.body.name - The name of Review.
 * @property {string} req.body.price - The price of Review.
 * @returns {Review}
 */
function create(req, res, next) {
  let review = new Review({
    description: req.body.description,
    product: req.params.productId
  });

  review.saveAsync()
    .then((savedReview) => {
      Product.get(savedReview.product).then((Product) => {
        Product.reviews.push(savedReview._id);
        Product.saveAsync().then(() => {
          res.json(savedReview);  
        });
        
      }).error((e) => next(e));
    })
    .error((e) => next(e));
}


/**
 * Get Review list.
 * @property {number} req.query.skip - Number of Reviews to be skipped.
 * @property {number} req.query.limit - Limit number of Reviews to be returned.
 * @returns {Review[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Review.list({ limit, skip }).then((Reviews) => res.json(Reviews))
    .error((e) => next(e));
}

/**
 * Delete all Review.
 * @returns {Review}
 */
function removeAll(req, res, next) {
  let product = req.product;

  Review
      .where({product: product._id})
      .removeAsync()
      .then((deletedReview) => {
        Product.get(product._id)
            .then((product) => {
              product.reviews = [];
              product.saveAsync().then(() => {
                res.json(deletedReview)
              }).error((e) => next(e));
              
            }).error((e) => next(e));
      })
      .error((e) => next(e));
}

/**
 * Delete Review.
 * @returns {Review}
 */
function remove(req, res, next) {
  let product = req.product,
      review = req.review;

  Product.get(product._id)
      .then((currentProduct) => {
        let reviews = _.without(currentProduct.reviews, review._id);
        currentProduct.reviews = reviews;
        currentProduct.saveAsync()
        .then((saveProduct) => {
          //review.removeAsync()
          //    .then(function (removeReview) {
                res.json(saveProduct)
              //}).error((e) => next(e))
        }).error((e) => next(e));
      })
      .error((e) => next(e));
}

export default { load, get, create, list, remove, removeAll };

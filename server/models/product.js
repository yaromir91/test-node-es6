import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Products Schema
 */
const ProductSchema = {};

export default mongoose.model('Product', ProductSchema);

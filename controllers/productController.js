const Product = require('../models/product');

// 1. Get All Products with Search, Filter & Sort
exports.getAllProducts = async (req, res, next) => {
  try {
    const { search, category, sort } = req.query;
    let queryObject = {};

    // Search by product name (case-insensitive)
    if (search) {
      queryObject.name = { $regex: search, $options: 'i' };
    }

    // Filter by category
    if (category) {
      queryObject.category = category;
    }

    let result = Product.find(queryObject);

    // Sort by price or date
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('-createdAt'); // Default: newest first
    }

    const products = await result;
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

// 2. Create Product (with Admin tracking)
exports.createProduct = async (req, res, next) => {
  try {
    const productData = {
      ...req.body,
      createdBy: req.user.userId // Admin who created the product
    };
    
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    next(error);
  }
};

// 3. Get Single Product
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// 4. Update Product
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// 5. Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
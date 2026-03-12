const Product = require('../models/productModel');
const Category = require('../models/categoryModel');


exports.createProduct  = async (req, res) => {

    try {
    const { name, description, price, stock, category } = req.body;    

      if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    const categoryExists = await Category.findById(category);

     if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

      let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: file.path,
      }));
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
    });


       return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });


    } catch (error) {
          console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
    }
}


exports.getAllProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error("Get Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



exports.getProductsByCategory = async (req, res) => {
  try {

    const products = await Product.find({
      category: req.params.categoryId,
    }).populate("category", "name");

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error("Get Products By Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
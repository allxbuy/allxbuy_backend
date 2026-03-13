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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    // check product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // if category provided check it
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      product.category = category;
    }

    // update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;

    // update images if new ones uploaded
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        url: file.path,
      }));

      product.images = images;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });

  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {

  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
        console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
}



exports.toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // toggle status
    product.isActive = !product.isActive;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product status updated",
      data: product,
    });

  } catch (error) {
    console.error("Toggle Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
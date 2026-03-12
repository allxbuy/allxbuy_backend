const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // handle multiple images
    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: file.path,
      }));
    }

    const category = await Category.create({
      name,
      description,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });

  } catch (error) {
    console.error("Create Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {

    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Categories fetched successfully",
      success: true,
      count: categories.length,
      data: categories,
    });

  } catch (error) {
    console.error("Get Categories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
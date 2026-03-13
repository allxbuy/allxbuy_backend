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

exports.updateCategory = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, description, replaceImages } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // update fields
    if (name) category.name = name;
    if (description) category.description = description;

    if (req.files && req.files.length > 0) {

      const newImages = req.files.map(file => ({
        url: file.path
      }));

      // replace images
      if (replaceImages === "true") {
        category.images = newImages;
      } else {
        // append images
        category.images = [...category.images, ...newImages];
      }

    }

    const updatedCategory = await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory
    });

  } catch (error) {

    console.error("Update Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

exports.deleteCategory = async (req, res) => {
  try {

    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });

  } catch (error) {

    console.error("Delete Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};


exports.toggleCategoryStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // toggle status
    category.isActive = !category.isActive;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category status updated",
      data: category
    });

  } catch (error) {

    console.error("Toggle Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
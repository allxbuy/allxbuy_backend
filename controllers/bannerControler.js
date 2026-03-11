const router = require('express').Router();
const Banner = require('../models/bannerModel');

exports.addBanner = async (req, res) => {
  try {
    const { title, subtitle, description, buttonText, position, isActive = true } = req.body;

    // validation
    if (!title || !position) {
      return res.status(400).json({
        message: "Title and Position are required"
      });
    }

    const imageUrl = req.file ? req.file.path : null;

    // check if banner already exists in this position
    const existingBanner = await Banner.findOne({ position });

    if (existingBanner) {
      // update existing banner
      existingBanner.title = title;
      existingBanner.subtitle = subtitle;
      existingBanner.description = description;
      existingBanner.buttonText = buttonText;
      existingBanner.isActive = isActive;

      if (imageUrl) {
        existingBanner.imageUrl = imageUrl;
      }

      const updatedBanner = await existingBanner.save();

      return res.status(200).json({
        message: "Banner updated successfully",
        banner: updatedBanner
      });
    }

    // create new banner
    const newBanner = new Banner({
      title,
      subtitle,
      description,
      imageUrl,
      buttonText,
      position,
      isActive
    });

    const savedBanner = await newBanner.save();

    res.status(201).json({
      message: "Banner created successfully",
      banner: savedBanner
    });

  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({
      message: "Error creating banner",
      error: error.message
    });
  }
};



exports.getHomepageBanners = async (req, res) => {
  try {

    const banners = await Banner.find({ isActive: true })
      .sort({ position: 1 })
    

    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners
    });

  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching banners",
      error: error.message
    });
  }
};
const router = require('express').Router();
const Banner = require('../models/bannerModel');

exports.addBanner = async (req, res) => {
  try {

    const {
      title,
      subtitle,
      description,
      discountText,
      label,
      price,
      oldPrice,
      buttonText,
      buttonLink,
      position,
      type,
      startDate,
      endDate,
      isActive = true
    } = req.body;

    // validation
    if (!type || !position) {
      return res.status(400).json({
        success: false,
        message: "Type and position are required"
      });
    }

    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required"
      });
    }

    // check if banner already exists in this type + position
    const existingBanner = await Banner.findOne({ type, position });

    // UPDATE existing banner
    if (existingBanner) {

      existingBanner.title = title;
      existingBanner.subtitle = subtitle;
      existingBanner.description = description;
      existingBanner.discountText = discountText;
      existingBanner.label = label;
      existingBanner.price = price;
      existingBanner.oldPrice = oldPrice;
      existingBanner.buttonText = buttonText;
      existingBanner.buttonLink = buttonLink;
      existingBanner.startDate = startDate;
      existingBanner.endDate = endDate;
      existingBanner.imageUrl = imageUrl;
      existingBanner.isActive = isActive;

      const updatedBanner = await existingBanner.save();

      return res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        data: updatedBanner
      });
    }

    // CREATE new banner
    const newBanner = new Banner({
      title,
      subtitle,
      description,
      discountText,
      label,
      price,
      oldPrice,
      buttonText,
      buttonLink,
      position,
      type,
      startDate,
      endDate,
      imageUrl,
      isActive
    });

    const savedBanner = await newBanner.save();

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: savedBanner
    });

  } catch (error) {

    console.error("Banner Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }
};


exports.getHomepageBanners = async (req, res) => {
  try {

    const banners = await Banner.find({ isActive: true })
      .sort({ position: 1 });

    const grouped = {
      heroCarousel: banners.filter(b => b.type === "hero_carousel"),
      sideBanners: banners.filter(b => b.type === "side_banner"),
      promoBanners: banners.filter(b => b.type === "promo_banner")
    };

    res.status(200).json({
      success: true,
      data: grouped
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching banners"
    });

  }
};
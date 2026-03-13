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

    // check existing banner
    let banner = await Banner.findOne({ type, position });

    // ================= UPDATE =================
    if (banner) {

      if (title !== undefined) banner.title = title;
      if (subtitle !== undefined) banner.subtitle = subtitle;
      if (description !== undefined) banner.description = description;
      if (discountText !== undefined) banner.discountText = discountText;
      if (label !== undefined) banner.label = label;
      if (price !== undefined) banner.price = price;
      if (oldPrice !== undefined) banner.oldPrice = oldPrice;
      if (buttonText !== undefined) banner.buttonText = buttonText;
      if (buttonLink !== undefined) banner.buttonLink = buttonLink;
      if (startDate !== undefined) banner.startDate = startDate;
      if (endDate !== undefined) banner.endDate = endDate;
      if (imageUrl) banner.imageUrl = imageUrl;
      if (isActive !== undefined) banner.isActive = isActive;

      const updatedBanner = await banner.save();

      return res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        data: updatedBanner
      });

    }

    // ================= CREATE =================

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Banner image is required"
      });
    }

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

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: savedBanner
    });

  } catch (error) {

    console.error("Banner Error:", error);

    return res.status(500).json({
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
      carousel: banners.filter(b => b.type === "carousel"),
      sideBanner: banners.filter(b => b.type === "sideBanner")
    };

    res.status(200).json({
      success: true,
      data: grouped
    });

  } catch (error) {

    console.error("Banner Fetch Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching banners",
      error: error.message
    });

  }
};

exports.deleteBanner = async (req, res) => {

  try {

    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });
    }


    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully"
    });
    
  } catch (error) {
    console.error("Delete Banner Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }
}

exports.editBanner = async (req, res) => {
  try {
    const { id } = req.params;
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
      startDate,
      endDate,
      isActive
    } = req.body;


    const banner = await Banner.findById(id);

if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });
    }

    const imageUrl = req.file?.path;


      if (title !== undefined) banner.title = title;
    if (subtitle !== undefined) banner.subtitle = subtitle;
    if (description !== undefined) banner.description = description;
    if (discountText !== undefined) banner.discountText = discountText;
    if (label !== undefined) banner.label = label;
    if (price !== undefined) banner.price = price;
    if (oldPrice !== undefined) banner.oldPrice = oldPrice;
    if (buttonText !== undefined) banner.buttonText = buttonText;
    if (buttonLink !== undefined) banner.buttonLink = buttonLink;
    if (startDate !== undefined) banner.startDate = startDate;
    if (endDate !== undefined) banner.endDate = endDate;
    if (isActive !== undefined) banner.isActive = isActive;


     if (imageUrl) {
      banner.imageUrl = imageUrl;
    }
  const updatedBanner = await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner
    });

  } catch (error) {
     console.error("Update Banner Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

exports.toggleBannerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.json({
        success: false,
        message: "Banner not found"
      });


    banner.isActive = !banner.isActive;


    await banner.save();

      res.status(200).json({
      success: true,
      message: "Banner status updated",
      data: banner
    });



    }
  } catch (error) {
        console.error("Toggle Banner Error:", error);


    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}
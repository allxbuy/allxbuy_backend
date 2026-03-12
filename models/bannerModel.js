const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },

  subtitle: {
    type: String,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  discountText: {
    type: String
  },

  label: {
    type: String // SALE / TOP RATED
  },

  price: {
    type: Number
  },

  oldPrice: {
    type: Number
  },

  imageUrl: {
    type: String,
    required: true
  },

  buttonText: {
    type: String,
    default: "Shop Now"
  },

  buttonLink: {
    type: String,
    default: "#"
  },

  type: {
    type: String,
    enum: ["hero_carousel", "side_banner"],
    required: true
  },

  position: {
    type: Number,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  startDate: Date,

  endDate: Date

},
{ timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
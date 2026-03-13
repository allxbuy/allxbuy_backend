const bannerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["carousel", "sideBanner"],
    required: true
  },

  position: {
    type: Number,
    required: true
  },

  label: String,
  discountText: String,

  title: String,
  subtitle: String,
  description: String,

  price: Number,
  oldPrice: Number,

  buttonText: String,
  buttonLink: String,

  imageUrl: {
    type: String,
    required: true
  },

  startDate: Date,
  endDate: Date,

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });


module.exports = mongoose.model("Banner", bannerSchema);
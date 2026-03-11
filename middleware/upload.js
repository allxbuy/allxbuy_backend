const multer = require("multer");
const storage = require("../config/cloudinaryStorage");

const upload = multer({ storage });

module.exports = upload;
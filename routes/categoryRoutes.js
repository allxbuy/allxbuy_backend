const router = require('express').Router();
const categoryController = require('../controllers/catergoryController');
const upload = require('../middleware/upload');
router.get("/", categoryController.getAllCategories);
router.post("/add", upload.array('images', 5), categoryController.createCategory);

module.exports = router;
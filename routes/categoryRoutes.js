const router = require('express').Router();
const categoryController = require('../controllers/catergoryController');
const upload = require('../middleware/upload');
router.get("/", categoryController.getAllCategories);
router.post("/add", upload.array('images', 5), categoryController.createCategory);
router.put("/update/:id", upload.array('images', 5), categoryController.updateCategory);
router.put("/toggle-status/:id", categoryController.toggleCategoryStatus);
router.delete("/delete/:id", categoryController.deleteCategory);
module.exports = router;
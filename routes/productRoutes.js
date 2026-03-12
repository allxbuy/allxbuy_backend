const router = require('express').Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
router.get("/", productController.getAllProducts);
router.post("/add", upload.array('images', 5), productController.createProduct);
router.get("/:id", productController.getProductById);
router.get("/category/:categoryId", productController.getProductsByCategory);
module.exports = router;
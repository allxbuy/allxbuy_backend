const router = require('express').Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
router.get("/", productController.getAllProducts);
router.post("/add", upload.array('images', 5), productController.createProduct);
router.get("/:id", productController.getProductById);
router.get("/category/:categoryId", productController.getProductsByCategory);

router.put("/update/:id", upload.array('images', 5), productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);  
router.put("/toggle-stock/:id", productController.toggleProductStatus);

module.exports = router;
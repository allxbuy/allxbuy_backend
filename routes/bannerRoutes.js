const router = require('express').Router();
const bannerController = require('../controllers/bannerControler');
const upload = require('../middleware/upload');
router.post('/add', upload.single('image'), bannerController.addBanner);
router.get('/homepage', bannerController.getHomepageBanners);
module.exports = router;
const router = require('express').Router();
const bannerController = require('../controllers/bannerControler');
const upload = require('../middleware/upload');
router.post('/add', upload.single('image'), bannerController.addBanner);
router.get('/homepage', bannerController.getHomepageBanners);
router.put('/update/:id', upload.single('image'), bannerController.editBanner);
router.put('/toggle-status/:id', bannerController.toggleBannerStatus);
router.delete('/delete/:id', bannerController.deleteBanner);

module.exports = router;
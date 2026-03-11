const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors')
const connectDB = require('./config/db');

connectDB();
app.use(cors());
app.get('/', (req, res) => {

    res.send('🚀🚀🚀🚀');
});
app.use('/api/banners', require('./routes/bannerRoutes'));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
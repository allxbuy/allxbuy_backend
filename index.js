const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || "3000";
const HOST = '0.0.0.0';
const cors = require('cors')
const connectDB = require('./config/db');

connectDB();
app.use(cors());
app.get('/', (req, res) => {

    res.send('🚀🚀🚀🚀');
});
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.listen(PORT, HOST,() => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
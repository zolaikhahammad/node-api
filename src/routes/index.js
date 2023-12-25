const express = require('express');
const feedRoutes = require('./feed');
const authRoutes = require('./auth');
const companyRoutes = require('./company');

const router = express.Router();

router.use('/feed', feedRoutes);
router.use('/auth', authRoutes);
router.use('/company', companyRoutes);

module.exports = router;

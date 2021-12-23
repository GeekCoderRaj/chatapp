const express = require('express');
const router = express.Router();

const {registerprofile, loginprofile} = require('../controller/auth');
router.route('/register').post(registerprofile)
router.route('/login').post(loginprofile)

module.exports = router;
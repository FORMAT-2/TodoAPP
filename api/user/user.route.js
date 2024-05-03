const router = require('express').Router();
const {createUser,loginUser,resetPassword} = require('./user.controller');
const {verifyJwtToken} = require('../../utils/Token/jwtMiddleware');
const {trycatch} = require('../../utils/Error/trycatch');

router.post('/create-user',trycatch(createUser));
router.post('/login',trycatch(loginUser));
router.post('/reset-password',verifyJwtToken,trycatch(resetPassword));

module.exports = router;


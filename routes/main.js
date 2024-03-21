

const express = require('express')

const { getMain } = require('../controllers/mainController');
const { postMessage } = require('../controllers/userController');

const router = express.Router();

router.get( '/', getMain)

router.post( '/postmessage', postMessage);

module.exports = router;

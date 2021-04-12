const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Outlet');

router.post('/getOutlet', ctrl.processData);


module.exports = router;
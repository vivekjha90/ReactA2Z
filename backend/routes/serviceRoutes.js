const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/serviceController');

router.get('/', serviceCtrl.getAllServices);
router.post('/', serviceCtrl.createService);
router.put('/:id', serviceCtrl.updateService);
router.delete('/:id', serviceCtrl.deleteService);

module.exports = router;

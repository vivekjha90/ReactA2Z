const express = require('express');
const router = express.Router();
const specialistCtrl = require('../controllers/specialistController');

router.get('/', specialistCtrl.getAllSpecialists);
router.post('/', specialistCtrl.createSpecialist);
router.put('/:id', specialistCtrl.updateSpecialist);
router.delete('/:id', specialistCtrl.deleteSpecialist);

module.exports = router;

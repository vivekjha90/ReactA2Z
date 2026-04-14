const express = require('express');
const router = express.Router();

const {
  addStaff,
  getAllStaff,
  deleteStaff,
  updateStaff
} = require('../controllers/staffController');

router.post('/addStaff', addStaff);   
router.get('/staff', getAllStaff);   
router.delete('/staff/:id', deleteStaff);   
router.put('/staff/:id', updateStaff);      

module.exports = router;
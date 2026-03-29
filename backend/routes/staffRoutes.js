const express = require('express');
const router = express.Router();

const {
  addStaff,
  getAllStaff,
  deleteStaff,
  updateStaff
} = require('../controllers/staffController');

router.post('/addStaff', addStaff);   //for adding new staff
router.get('/staff', getAllStaff);   // to get existing staff
router.delete('/staff/:id', deleteStaff);   // DELETE
router.put('/staff/:id', updateStaff);      // UPDATE

module.exports = router;
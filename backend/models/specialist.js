const mongoose = require('mongoose');

const SpecialistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  experience: { type: Number, required: true },
  level: { 
    type: String, 
    enum: ['Senior', 'Master', 'Celebrity'], 
    default: 'Senior' 
  },
  rating: { type: Number, default: 4.5 },
  status: { 
    type: String, 
    enum: ['Available', 'Not Availbale', 'On Break'], 
    default: 'Available' 
  },
  clients: { type: Number, default: 0 }
}, 
{
  collection: 'newSpecialist',
  timestamps: true 
});

module.exports = mongoose.model('Specialist', SpecialistSchema);

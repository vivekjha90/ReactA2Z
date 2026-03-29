const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, 
  duration: { type: String, required: true }, 
  category: { 
    type: String, 
    enum: ['Grooming', 'Wellness', 'Beauty'], 
    default: 'Grooming' 
  }
}, 
{
  collection:'newService'
},
{ timestamps: true }

);

module.exports = mongoose.model('Service', ServiceSchema);

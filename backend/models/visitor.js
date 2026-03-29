const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  timeIn: { 
    type: String, 
    default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
  },
  status: { 
    type: String, 
    enum: ['Waiting', 'In Service', 'Completed'], 
    default: 'Waiting' 
  },
  reminderSent: {   //field for remiander
    type: Boolean,
    default: false
  }
}, 
{
 collection:'newVisitor'
},
{ timestamps: true }

);

module.exports = mongoose.model('Visitor', VisitorSchema);

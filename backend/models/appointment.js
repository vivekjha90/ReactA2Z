const mongoose= require('mongoose');

const appointmentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },

    serviceName:{
        type:String,
        required:true,
    },

   specialist:{
    type:String,
    required:true,
   },

   appointmentDate:{
    type: Date,
    required:true,
   }
},
{
  collection:'appointments'
},
{ timestamps: true }
)

module.exports = mongoose.model('appointment', appointmentSchema);
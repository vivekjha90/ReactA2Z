const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes'); 
const specialistRoutes = require('./routes/specialistRoutes'); 
const serviceRoutes = require('./routes/serviceRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
require('./scheduler/cronJob');
const analyticsRoutes = require('./routes/analyticsRoutes'); 
const app = express();
require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());    

app.use('/', authRoutes); 
app.use('/', staffRoutes);
app.use('/api/specialists', specialistRoutes); 
app.use('/api/services', serviceRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/analytics', analyticsRoutes); 


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

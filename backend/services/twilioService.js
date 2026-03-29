const twilio = require('twilio');
require('dotenv').config();
const client = twilio( process.env.TWILIO_SID,process.env.TWILIO_AUTHTOKEN);

const sendSMS = async (phone, name) => {
  try {
    await client.messages.create({
      body: `Hi ${name}, it's been 30 days since your visit. Please visit again 😊`,
      from: process.env.TWILIO_NUMBER, // your Twilio number
      to: `+91${phone}`
    });

    console.log("SMS sent to:", phone);
  } catch (err) {
    console.error("Twilio Error:", err.message);
  }
};

module.exports = sendSMS;


//K4FU64T26LPUNR84TGYXCJL2 [recovery code]
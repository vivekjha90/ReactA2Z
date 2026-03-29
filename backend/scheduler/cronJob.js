const cron = require("node-cron");
const Visitor = require("../models/visitor");
const sendSMS = require("../services/twilioService");

cron.schedule("0 9 * * *", async () => {
  console.log("Running Reminder Scheduler...");

  const today = new Date();

  try {
    const visitors = await Visitor.find({ reminderSent: false });

    for (let v of visitors) {
      const visitDate = new Date(v.date); // convert string → Date

      const diffDays = Math.floor((today - visitDate) / (1000 * 60 * 60 * 24));

      if (diffDays >= 30) {
        await sendSMS(v.phone, v.name);

        v.reminderSent = true;

        const reminderCount = reminderCount + 1; 
        await v.save();
      }
    }

    console.log("Scheduler completed");
  } catch (err) {
    console.error("Scheduler Error:", err);
  }
});

const Visitor = require('../models/visitor');

exports.getServiceAnalytics = async (req, res) => {
  try {
    const stats = await Visitor.aggregate([
      {
        
        $lookup: {
          from: 'newService', 
          localField: 'service',
          foreignField: 'name',
          as: 'serviceInfo'
        }
      },
      { $unwind: { path: "$serviceInfo", preserveNullAndEmptyArrays: true } },
      {
        // String date (YYYY-MM-DD)  to month
        $group: {
          _id: { $month: { $dateFromString: { dateString: "$date" } } },
          count: { $sum: 1 },
          totalRevenue: { $sum: { $ifNull: ["$serviceInfo.price", 0] } }
        }
      }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // empty structure for 12 months
    const finalData = monthNames.map((name) => ({
      month: name,
      servicesCount: 0,
      totalCost: 0
    }));


    stats.forEach(item => {
      if (item._id >= 1 && item._id <= 12) {
        finalData[item._id - 1].servicesCount = item.count;
        finalData[item._id - 1].totalCost = item.totalRevenue;
      }
    });

    res.json(finalData);
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({ error: error.message });
  }
};

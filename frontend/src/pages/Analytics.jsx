import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "/src/styles/analytics.css";
import { analytics } from "../API/menuPages";

const Analytics = () => {
  const [data, setData] = useState([]);
  
  
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await analytics();
        setData(res.data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="analytics-panel">
      <h2 className="analytics-header"></h2>
      <div class="reminder-header">
        <h1>Annual Service Analytics</h1>
        <p>Track Your Report</p>
        <div class="reminder-header-divider"></div>
      </div>

      <div className="analytics-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              label={{
                value: "No. of Services",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#8884d8" },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              label={{
                value: "Total Revenue (₹)",
                angle: 90,
                position: "insideRight",
                style: { textAnchor: "middle", fill: "#82ca9d" },
              }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />

            <Bar
              yAxisId="left"
              dataKey="servicesCount"
              fill="#8884d8"
              radius={[5, 5, 0, 0]}
              name="Services Count"
              barSize={35}
            />

            <Line
              yAxisId="right"
              type="monotone" 
              dataKey="totalCost"
              stroke="#f79731"
              strokeWidth={3}
              name="Total Revenue (₹)"
              dot={{
                r: 6,
                fill: "#0b8893",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

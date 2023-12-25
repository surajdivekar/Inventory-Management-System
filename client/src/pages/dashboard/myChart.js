import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function MyChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart instance
    }

    chartInstance = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "# of Votes",
            data: [1200, 1900, 3000],
            backgroundColor: [
              "rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Clean up the chart instance on component unmount
      }
    };
  }, []);

  return <canvas ref={chartRef} id="myChart" className="chart" />;
}

export function Earning() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart instance
    }

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "# Earning",
            data: [
              1200, 1090, 3000, 5400, 1220, 3600, 4800, 4576, 2526, 8542, 4587,
              8000,
            ],
            backgroundColor: [
              "rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
              "rgba(75,192,192,1)",
              "rgba(153,102,255,1)",
              "rgba(255,159,64,1)",
              "rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
              "rgba(75,192,192,1)",
              "rgba(153,102,255,1)",
              "rgba(255,159,64,1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Clean up the chart instance on component unmount
      }
    };
  }, []);

  return <canvas ref={chartRef} id="earningChart" className="chart" />;
}

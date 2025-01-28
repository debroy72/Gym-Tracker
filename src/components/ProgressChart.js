import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { loadProgress } from "../utils/localStorageHelper";

// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ProgressChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const progressData = loadProgress().history || [];

    // Group workouts by week and category
    const categoryProgress = {};
    const weekLabels = new Set();

    progressData.forEach((entry) => {
      const [day, month, year] = entry.date.split("/");
      const weekKey = `${year}-W${Math.ceil(day / 7)}`; // Group by week
      weekLabels.add(weekKey);

      Object.keys(entry.exercises).forEach((exercise) => {
        const category = getCategory(exercise);
        if (!categoryProgress[category]) {
          categoryProgress[category] = {};
        }

        if (!categoryProgress[category][weekKey]) {
          categoryProgress[category][weekKey] = { reps: 0, weight: 0, count: 0 };
        }

        categoryProgress[category][weekKey].reps += parseInt(entry.exercises[exercise].reps || 0, 10);
        categoryProgress[category][weekKey].weight += parseInt(entry.exercises[exercise].weight || 0, 10);
        categoryProgress[category][weekKey].count += 1;
      });
    });

    // Prepare dataset for each category
    const datasets = Object.keys(categoryProgress).map((category) => ({
      label: category,
      data: Object.values(categoryProgress[category]).map((data) =>
        data.count > 0 ? Math.round(data.weight / data.count) : 0
      ), // Average weight lifted per exercise
      borderColor: getColor(category),
      fill: false,
      tension: 0.2,
    }));

    setChartData({
      labels: Array.from(weekLabels).sort(),
      datasets: datasets,
    });
  }, []);

  return (
    <div className="progress-chart">
      <h2>📈 Weekly Progress</h2>
      <Line data={chartData} />
    </div>
  );
};

// Helper function to categorize exercises
const getCategory = (exercise) => {
  if (exercise.includes("Bench Press") || exercise.includes("Tricep")) return "Chest & Triceps";
  if (exercise.includes("Shoulder") || exercise.includes("Lat") || exercise.includes("Pull")) return "Back & Shoulders";
  if (exercise.includes("Bicep") || exercise.includes("Plank") || exercise.includes("Crunches")) return "Cardio & Biceps";
  if (exercise.includes("Leg") || exercise.includes("Squats")) return "Legs & Core";
  return "Other";
};

// Assign colors to categories
const getColor = (category) => {
  const colors = {
    "Chest & Triceps": "rgba(255, 99, 132, 1)",
    "Back & Shoulders": "rgba(54, 162, 235, 1)",
    "Cardio & Biceps": "rgba(255, 206, 86, 1)",
    "Legs & Core": "rgba(75, 192, 192, 1)",
  };
  return colors[category] || "rgba(153, 102, 255, 1)";
};

export default ProgressChart;
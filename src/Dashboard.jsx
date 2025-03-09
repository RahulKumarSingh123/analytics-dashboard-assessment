import { useEffect, useState } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

import { fetchCSVData } from "./fetchCSVData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CSV_URL =
  "https://raw.githubusercontent.com/amit-12k/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCSVData(CSV_URL);
      setData(result);
    };

    fetchData();
  }, []);


  const manufacturers = [...new Set(data.map((row) => row["Make"]))];
  const vehicleCounts = manufacturers.map(
    (make) => data.filter((row) => row["Make"] === make).length
  );

  const countries=[...new Set(data.map((row)=>row["County"]))];
  const vehicleCounts2=countries.map((country)=>data.filter((row)=>row["County"]===country).length);

  const fuelTypes = [
    ...new Set(data.map((row) => row["Electric Vehicle Type"])),
  ];
  const fuelCounts = fuelTypes.map(
    (type) => data.filter((row) => row["Electric Vehicle Type"] === type).length
  );

  const years = [...new Set(data.map((row) => row["Model Year"]))].sort();
  const yearCounts = years.map(
    (year) => data.filter((row) => row["Model Year"] === year).length
  );

  return (
    <div className="bg-gray-900 text-white p-5">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-10">
        Electric Vehicle Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 shadow-lg rounded-lg p-5 h-96 object-contain">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Vehicle Count by Manufacturer
          </h2>
          {data.length > 0 && (
            <Bar
              data={{
                labels: manufacturers,
                datasets: [
                  {
                    label: "Number of Vehicles",
                    data: vehicleCounts,
                    backgroundColor: "rgba(59, 130, 246, 0.8)",
                    borderColor: "rgba(59, 130, 246, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      color: "white",
                      beginAtZero: true,
                    },
                  },
                },
              }}
            />
          )}
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-5 h-96">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Fuel Type Distribution
          </h2>
          {data.length > 0 && (
            <Pie
              data={{
                labels: fuelTypes,
                datasets: [
                  {
                    label: "Fuel Type Count",
                    data: fuelCounts,
                    backgroundColor: ["#f87171", "#34d399", "#fde047", "#a78bfa"],
                    borderColor: ["#ef4444", "#10b981", "#f59e0b", "#8b5cf6"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          )}
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-5 h-96">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Growth of EV Registrations Over Years
          </h2>
          {data.length > 0 && (
            <Line
              data={{
                labels: years,
                datasets: [
                  {
                    label: "Registrations",
                    data: yearCounts,
                    borderColor: "rgba(251, 146, 60, 1)",
                    backgroundColor: "rgba(251, 146, 60, 0.2)",
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      color: "white",
                      beginAtZero: true,
                    },
                  },
                },
              }}
            />
          )}
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-5 h-96">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Proportion of EV in Different Countries
          </h2>
          {data.length > 0 && (
            <Bar
              data={{
                labels: countries.slice(0, ),
                datasets: [
                  {
                    label: "EV Counts",
                    data: vehicleCounts2.slice(0, ),
                    backgroundColor: [
                      "#3b82f6",
                      "#fb923c",
                      "#ef4444",
                      "#10b981",
                      "#a78bfa",
                    ],
                    borderColor: [
                      "#1e40af",
                      "#d97706",
                      "#b91c1c",
                      "#059669",
                      "#7c3aed",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

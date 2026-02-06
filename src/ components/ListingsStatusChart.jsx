import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ListingsStatusChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data?.length) return;

    // 🔥 Destroy previous instance (StrictMode safe)
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext("2d");

    const labels = data.map(d => d.date);

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Active",
            data: data.map(d => d.active),
            borderColor: "#198754",
            backgroundColor: "rgba(25,135,84,0.12)",
            tension: 0.35,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: "Pending",
            data: data.map(d => d.pending),
            borderColor: "#ffc107",
            backgroundColor: "rgba(255,193,7,0.12)",
            tension: 0.35,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: "Rejected",
            data: data.map(d => d.rejected),
            borderColor: "#dc3545",
            backgroundColor: "rgba(220,53,69,0.12)",
            tension: 0.35,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
          duration: 300, // subtle, not heavy
        },

        interaction: {
          mode: "index",
          intersect: false,
        },

        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 12,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: "#212529",
            padding: 10,
            titleColor: "#fff",
            bodyColor: "#fff",
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#6c757d",
            },
          },
          y: {
            grid: {
              color: "rgba(0,0,0,0.05)",
            },
            ticks: {
              precision: 0,
              color: "#6c757d",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Listings Status Over Time</h6>
        <small className="text-muted">Last 14 days</small>
      </div>

      <div className="card-body" style={{ height: 300 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

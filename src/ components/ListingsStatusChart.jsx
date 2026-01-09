import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ListingsStatusChart({ data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">Listings Status Over Time</h6>
        <small className="text-muted">Last 14 days</small>
      </div>

      <div className="card-body" style={{ height: 320 }}>

        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={280}
        >
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="active" stroke="#198754" strokeWidth={2} />
            <Line type="monotone" dataKey="pending" stroke="#ffc107" strokeWidth={2} />
            <Line type="monotone" dataKey="rejected" stroke="#dc3545" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>

      
      </div>
    </div>
  );
}

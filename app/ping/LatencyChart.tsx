"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    ip: string;
    alive: boolean;
    time: number | null;
  }[];
};

export default function LatencyChart({ data }: Props) {
  const chartData = data
    ?.filter((d) => d.alive && d.time !== null)
    .map((d) => ({
      ip: d.ip,
      latency: Number(d.time),
    }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ip" />
          <YAxis unit=" ms" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="latency"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

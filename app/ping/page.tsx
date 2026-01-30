"use client";

import useSWR from "swr";
import LatencyChart from "./LatencyChart";

const fetcher = (url: string) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ips: ["8.8.8.8", "1.1.1.1", "192.168.1.1"],
    }),
  }).then((r) => r.json());

export default function PingPage() {
  const { data, isLoading } = useSWR("/api/ping", fetcher, {
    refreshInterval: 5000,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Ping Monitor</h1>

      {/* CHART */}
      <div className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Latency Chart (ms)</h2>
        {data && <LatencyChart data={data} />}
      </div>

      {/* TABLE */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">IP</th>
              <th className="p-3">Status</th>
              <th className="p-3">Latency</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="p-4 text-center">
                  Checking...
                </td>
              </tr>
            )}

            {data?.map((row: { ip: string; alive: boolean; time: number }) => (
              <tr key={row.ip} className="border-t">
                <td className="p-3 font-mono">{row.ip}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${
                      row.alive ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {row.alive ? "ONLINE" : "OFFLINE"}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {row.alive ? `${row.time} ms` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

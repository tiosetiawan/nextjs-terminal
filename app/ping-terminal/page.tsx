"use client";

import { useEffect, useRef, useState } from "react";

const IP = "10.87.1.64";
const PORT = 3389;
const MAX_PING = 5;

type PingResult = {
  alive: boolean;
  time: number | null;
  line: string;
};

export default function PingTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- PING 5x ---
  useEffect(() => {
    if (count >= MAX_PING) return;

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/ping-once?ip=${IP}`);
      const data: PingResult = await res.json();

      setLines((prev) => [...prev, data.line]);
      setCount((c) => c + 1);

      if (data.alive && data.time !== null) {
        setTimes((t) => (data.time !== null ? [...t, data.time] : t));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  // --- STATISTIK + PORT CHECK ---
  useEffect(() => {
    if (count !== MAX_PING) return;

    const sent = MAX_PING;
    const received = times.length;
    const lost = sent - received;
    const lossPercent = Math.round((lost / sent) * 100);

    const min = Math.min(...times);
    const max = Math.max(...times);
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);

    (async () => {
      const res = await fetch(
        `/api/port-check?host=${IP}&port=${PORT}`
      );
      const portData = await res.json();

      setLines((prev) => [
        ...prev,
        "",
        "",
        `Ping statistics for ${IP}:`,
        "",
        `    Packets: Sent = ${sent}, Received = ${received}, Lost = ${lost} (${lossPercent}% loss),`,
        "",
        `Approximate round trip times in milli-seconds:`,
        `    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`,
        "",
        "",
        `PS C:\\Users\\admin> Test-NetConnection ${IP} -Port ${PORT}`,
        "",
        `ComputerName     : ${IP}`,
        `RemotePort       : ${PORT}`,
        `TcpTestSucceeded : ${portData.open ? "True" : "False"}`,
        "",
        "Control-C",
      ]);
    })();
  }, [count]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-6 text-sm">
      <div>Microsoft Windows [Version 10.0.19045.4046]</div>
      <div>(c) Microsoft Corporation. All rights reserved.</div>
      <br />
      <div>PS C:\Users\admin&gt; ping {IP}</div>
      <br />

      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const IP = "10.87.1.400";

export default function PingTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/ping-once?ip=${IP}`);
      const data = await res.json();

      const line: string = data.line ?? "";

      setLines((prev) => [
        ...prev,
        line,
      ]);

      // Simple heuristics to detect online/offline from ping output
      const successPattern = /time=|ttl=|bytes=/i;
      const failurePattern = /request timed out|destination host unreachable|could not find host|no route to host|timed out/i;

      if (successPattern.test(line)) {
        setIsOnline(true);
      } else if (failurePattern.test(line)) {
        setIsOnline(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-6">
      <div className="text-sm mb-2">
        Smart Mining System [Version 0.1] / IMIP APPDEV
      </div>
      <div className="text-sm mb-4">
        (c) Microsoft Corporation. All rights reserved.
      </div>

      <div className="flex items-center text-sm mb-2">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            isOnline === null ? "bg-gray-500" : isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="mr-4">{isOnline === null ? "Checking..." : isOnline ? "Online" : "Offline"}</span>
      </div>

      <div className="text-sm mb-2">
        PS C:\Users\admin&gt; ping {IP} -t
      </div>

      <div className="space-y-1 text-sm">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

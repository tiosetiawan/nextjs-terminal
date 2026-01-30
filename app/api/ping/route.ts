import ping from "ping";

export async function POST(req: Request) {
  const body = await req.json();
  const ips: string[] = body.ips;

  if (!Array.isArray(ips)) {
    return Response.json(
      { error: "ips harus array" },
      { status: 400 }
    );
  }

  const results = await Promise.all(
    ips.map(async (ip) => {
      const res = await ping.promise.probe(ip, { timeout: 2 });
      return {
        ip,
        alive: res.alive,
        time: res.time,
      };
    })
  );

  return Response.json(results);
}

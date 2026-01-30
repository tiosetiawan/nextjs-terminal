import ping from "ping";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ip = searchParams.get("ip");

  if (!ip) {
    return Response.json({ error: "IP required" }, { status: 400 });
  }

  const res = await ping.promise.probe(ip, { timeout: 1 });

  if (!res.alive) {
    return Response.json({
      line: `Request timed out.`,
      alive: false,
    });
  }

  return Response.json({
    alive: true,
    line: `Reply from ${ip}: bytes=32 time=${res.time}ms TTL=125`,
  });
}

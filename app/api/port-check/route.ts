import net from "net";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const host = searchParams.get("host");
  const port = Number(searchParams.get("port"));

  if (!host || !port) {
    return Response.json({ error: "host & port required" }, { status: 400 });
  }

  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);

    socket.connect(port, host, () => {
      socket.destroy();
      resolve(Response.json({ open: true }));
    });

    socket.on("error", () => {
      socket.destroy();
      resolve(Response.json({ open: false }));
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(Response.json({ open: false }));
    });
  });
}

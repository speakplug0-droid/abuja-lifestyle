const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  try {
    const url = new URL(
      req.url,
      `http://${req.headers.host || "localhost"}`
    );

    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") {
      pathname = "/index.html";
    }

    const filePath = path.resolve(ROOT, "." + pathname);

    if (!filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("Not found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();

      res.writeHead(200, {
        "Content-Type":
          mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-cache"
      });

      res.end(data);
    });
  } catch (error) {
    res.writeHead(500);
    res.end("Server error");
  }
});

const wss = new WebSocket.Server({ server });

const players = new Map();

wss.on("connection", (socket) => {
  const id = Math.random().toString(36).substring(2, 10);

  players.set(id, {
    x: 0,
    y: 0,
    z: 20,
    rotation: 0
  });

  socket.send(
    JSON.stringify({
      type: "welcome",
      id
    })
  );

  socket.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "position") {
        const player = players.get(id);

        if (player) {
          player.x = Number(data.x) || 0;
          player.y = Number(data.y) || 0;
          player.z = Number(data.z) || 0;
          player.rotation = Number(data.rotation) || 0;
        }
      }
    } catch {
      console.log("Invalid message");
    }
  });

  socket.on("close", () => {
    players.delete(id);
  });
});

setInterval(() => {
  const message = JSON.stringify({
    type: "players",
    players: Object.fromEntries(players)
  });

  for (const socket of wss.clients) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }
}, 50);

server.listen(PORT, () => {
  console.log(`AbujaLifestyle server running on port ${PORT}`);
});
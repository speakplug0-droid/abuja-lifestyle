const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("AbujaLifestyle multiplayer server is online!");
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

  socket.send(JSON.stringify({
    type: "welcome",
    id
  }));

  socket.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "position") {
        const player = players.get(id);

        if (player) {
          player.x = data.x;
          player.y = data.y;
          player.z = data.z;
          player.rotation = data.rotation;
        }
      }
    } catch (error) {
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
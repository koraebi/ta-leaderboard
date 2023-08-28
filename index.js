const express = require('express');
const app = express();
const cron = require("node-cron");
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const fs = require('fs/promises');
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

server.listen(port, () => console.log(`Listening http requests and socket events on port ${port}`));

// Getting players from database
const getPlayers = async () => {
  let players = [];
  try {
    const playersJson = await fs.readFile('./data/players.json');
    if (playersJson && playersJson.length) {
      players = JSON.parse(playersJson);
      if (players.length) {
        players.sort(function(a, b) { return b.score - a.score }); // sorting the players to avoid doing it on client side
        players.forEach((player, index) => {
          player.rank = index + 1; // Adding ranks dynamically to avoid updating the players in the database everytime the score changes
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  return players;
}

// Getting player from database
const getPlayer = async (username) => {
  const players = await getPlayers();
  return players.find(player => player.username === username);
}

// Updating player in database
const updatePlayer = async (newPlayer) => {
  try {
    let players = await getPlayers();
    if (players.length) {
      players = players.map(player => player.username === newPlayer.username ? { ...player, ...newPlayer } : player);
      await fs.writeFile('./data/players.json', JSON.stringify(players));
    }
  } catch (e) {
    console.log(e);
  }
}

// Http call to get the list of players
app.get('/players', async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalPlayers = await getPlayers();

  const response = {
    total: totalPlayers.length,
    limit,
    players: totalPlayers.slice(startIndex, endIndex),
  };

  res.send(response);
});

// Sending socket event every 15s to update a player's score and check real time
cron.schedule("*/10 * * * * *", async () => {
  let player = await getPlayer('partoffensive');
  await updatePlayer({ ...player, score: player.score + 30 });
  player = await getPlayer('partoffensive');
  io.emit('playerUpdate', player);
  console.log(`Socket to update player '${player.username}' emitted to the client`);
});

// Socket event when connecting
io.on('connection', (socket) => {
  console.log(`User connected`);
});
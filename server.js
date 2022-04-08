const express = require('express');
const { Server } = require('ws');
const fs = require('fs');

const PORT = 5900;
const HOME = '/index.html';

const server = express()
.use((req, res) => res.sendFile(HOME, { root: __dirname }))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

const ws = new Server({ server });

ws.on("connection", (socket) => {
    socket.on("close", () => console.log("Client disconnected"));
  });
  
  const image1 = fs.readFileSync(__dirname + "/images/np1.Jpg",'base64');
  const image2 = fs.readFileSync(__dirname + "/images/np2.jpg", 'base64');
  const image3 = fs.readFileSync(__dirname + "/images/np3.jpg", 'base64');
  
  const images = [image1, image2, image3];
  
  let index = 0;
  
setInterval(() => {
  ws.clients.forEach((client) => {
    client.send(images[index]);
  });
  index = index + 1;
  if (index > images.length - 1) {
    index = 0;
  }
}, 1000);

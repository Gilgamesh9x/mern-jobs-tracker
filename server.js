import http from "http";
import mongoConnect from "./src/services/mongo.js";
import app from "./app.js";

const port = process.env.PORT || 5100;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

startServer();

const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "10.126.0.55",
    port: "6379",
    db: "4",
  },
});

async function connectRedis() {
  try {
    await client.connect();
    console.log("redis client connecting...");
  } catch (error) {
    client.on("error", function (err) {
      console.log("error happen", err);
    });
  }
}

module.exports = { client, connectRedis };

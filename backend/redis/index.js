const redis = require("ioredis");
const client = new redis.Redis();

client.on("error", (err) => {
  console.log(`Redis Error: ${err}`);
});

module.exports = client;

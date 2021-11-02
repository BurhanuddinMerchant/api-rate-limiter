// import redis client
const { createClient } = require("redis");

// initialize redis cliet
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// time limit for 60s (or we can specify that in env)
const DEFAULT_EXPIRATION = process.env.DEFAULT_EXPIRATION || 60;

const { promisify } = require("util");

// establish connection with redis server
redisClient.on("connect", () => {
  console.log("Redis database connected");
});

// middleware to rate limit
const checkForRateLimit = (req, res, next) => {
  try {
    redisClient.get("count_this_min", async (err, reply) => {
      if (err) {
        throw err;
      } else {
        // check if the timer for rate limit has started or not
        if (reply == null) {
          /*
                if count is not maintained , it means 1 min has passed, 
                start a new count for this minute
          */
          redisClient.set("count_this_min", 1, "EX", DEFAULT_EXPIRATION);
          next();
        } else {
          /* 
                Check if any more api calls can be made , if not , 
                then throw rate limit error
          */
          curr_requests = parseInt(reply);
          if (curr_requests < 20) {
            /* get the time remaining for expiration and update the key */

            const ttl = promisify(redisClient.ttl).bind(redisClient);
            const remaingTime = await ttl("count_this_min");
            redisClient.set(
              "count_this_min",
              curr_requests + 1,
              "EX",
              remaingTime
            );
            next();
          } else {
            res.status(429).send({
              message: "Too Many Requests!",
              error: "API Rate Limit Reached! Please try again in a minute",
              data: null,
            });
          }
        }
      }
    });
  } catch (e) {
    res.status(404).send({
      message: "An Error Occured",
      error: e,
      data: null,
    });
  }
};

module.exports = { checkForRateLimit };

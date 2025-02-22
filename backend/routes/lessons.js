var express = require("express");
const redisClient = require("../redis");

var router = express.Router();

router.get("/completed", async (req, res) => {
  const chatData = await redisClient.get("chatData");
  chatData ? res.json(JSON.parse(chatData).length >= 10) : res.json(false);
});

router.get("/", (req, res) => {
  // List of modules. Should be obtained from a database, but hardcoded for the purpose of this demo.
  const modules = [
    {
      title: "Lesson 1",
      url: "lesson-1",
    },
    {
      title: "Lesson 2",
      url: "lesson-2",
    },
    {
      title: "Lesson 3",
      url: "lesson-3",
    },
    {
      title: "Lesson 4",
      url: "lesson-4",
    },
    {
      title: "Lesson 5",
      url: "lesson-5",
    },
  ];
  res.json(modules);
});

module.exports = router;

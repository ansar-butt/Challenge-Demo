var express = require("express");
var router = express.Router();
require("dotenv").config();
const together = require("together-ai");
const redisClient = require("../redis");

const togetherClient = new together.Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

router.post("/", async (req, res) => {
  const chatData = await redisClient.get("chatData");
  const chatDataParsed = JSON.parse(chatData);

  const messageList = [{ content: req.body.message, role: "user" }].concat(
    chatDataParsed ?? []
  );

  console.log("Message List Length", messageList.length);

  togetherClient.chat.completions
    .create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: messageList,
      stream: false,
    })
    .then(async (response) => {
      const messages = messageList.concat([
        {
          content: response.choices[0].message.content
            .replace(/\s+/g, " ")
            .trim(),
          role: response.choices[0].message.role,
        },
      ]);
      console.log("Assisstant Response", response.choices[0].message.content);

      await redisClient.set("chatData", JSON.stringify(messages));
      res.json({
        message: response.choices[0].message.content,
        continue: messages.length < 10,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

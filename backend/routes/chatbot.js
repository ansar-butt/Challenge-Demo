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

  const messageList = chatDataParsed
    ? chatDataParsed.concat({ content: req.body.message, role: "user" })
    : [{ content: req.body.message, role: "user" }];

  togetherClient.chat.completions
    .create({
      messages: messageList,
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      max_tokens: null,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
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

      await redisClient.set("chatData", JSON.stringify(messages));
      res.json({
        message: response.choices[0].message.content,
        continue: messages.length < 10,
      });
    })
    .catch((err) => {
      console.log("Err", err);
      res.json({
        message: "Error",
        continue: true,
      });
    });
});

module.exports = router;

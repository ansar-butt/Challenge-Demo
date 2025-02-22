var express = require("express");
var router = express.Router();
require("dotenv").config();
const together = require("together-ai");

const togetherClient = new together.Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

router.post("/", async (req, res) => {
  const messageList = [req.body.message];

  const messages = messageList.map((message) => ({
    role: "user",
    content: message,
  }));

  togetherClient.chat.completions
    .create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: messages,
      stream: false,
    })
    .then((response) => {
      res.json(response.choices[0].message.content);
    })
    .catch((err) => console.log(err));
});

module.exports = router;

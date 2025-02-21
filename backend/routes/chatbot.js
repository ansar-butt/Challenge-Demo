var express = require("express");
var router = express.Router();
require("dotenv").config();
const together = require("together-ai");

router.get("/", async (req, res) => {
  const togetherClient = new together.Together({
    apiKey: process.env.TOGETHER_API_KEY,
  });

  const messages = req.msgs.map((message) => ({
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
      console.log(response.choices[0].message.content);
      res.json("");
      //   res.json()
    })
    .catch((err) => console.log(err));
});

module.exports = router;

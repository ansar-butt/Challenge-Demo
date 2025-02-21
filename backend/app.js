const express = require("express");

const app = express();
var api = require("./routes/chatbot");

app.use("/chat", api);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

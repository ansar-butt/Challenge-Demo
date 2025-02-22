const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

var chatbot = require("./routes/chatbot");
var modules = require("./routes/modules");

app.use(cors(corsOptions));
app.use("/chat", chatbot);
app.use("/modules-list", modules);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

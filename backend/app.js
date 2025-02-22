const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

var chatbot = require("./routes/chatbot");
var modules = require("./routes/modules");
var lesson = require("./routes/lessons");

app.use(cors(corsOptions));
app.use(express.json());
app.use("/chat", chatbot);
app.use("/modules-list", modules);
app.use("/lessons-list", lesson);

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

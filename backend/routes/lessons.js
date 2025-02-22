var express = require("express");
// const client = require("../redis");

var router = express.Router();

router.get("/completed", async (req, res) => {
  //   const chatData = await client.get("chatData");
  //   if (chatData) res.json(JSON.parse(chatData).length >= 10);
  res.json(false);
});

// router.get("/:moduleName", async (req, res) => {
router.get("/", (req, res) => {
  // List of modules. Should be obtained from a database, but hardcoded for the purpose of this demo.
  const modules = [
    {
      title: "Healthcare & Patient Safety",
      url: "lesson-1",
    },
    {
      title: "Finance & Data Privacy",
      url: "lesson-2",
    },
    {
      title: "Cybersecurity Training",
      url: "lesson-3",
    },
    {
      title: "HR & Anti-Harassment",
      url: "lesson-4",
    },
    {
      title: "Customer Data Protection",
      url: "lesson-5",
    },
  ];
  res.json(modules);
});

module.exports = router;

var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  // List of modules. Should be obtained from a database, but hardcoded for the purpose of this demo.
  const modules = [
    {
      title: "Healthcare & Patient Safety",
      summary:
        "Learn to navigate healthcare compliance laws, ensure patient safety, and uphold legal and ethical standards in medical practice.",
    },
    {
      title: "Finance & Data Privacy",
      summary:
        "Master the essentials of finance and data privacy compliance to protect assets, ensure regulatory adherence, and mitigate risks in a data-driven world!",
    },
    {
      title: "Cybersecurity Training",
      summary:
        "Master cybersecurity compliance laws to protect data, mitigate risks, and ensure legal security in the digital world!",
    },
    {
      title: "HR & Anti-Harassment",
      summary:
        "Master HR compliance and anti-harassment laws to create a safe, respectful, and legally sound workplace!",
    },
    {
      title: "Customer Data Protection",
      summary:
        "Master the laws of customer data protection and ensure compliance while safeguarding privacy in the digital age!!",
    },
  ];
  res.json(modules);
});

module.exports = router;

const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const filePath = path.join(process.cwd(), "data", "browseSec.json");

router.get("/", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, file) => {
    if (err) {
      return res.status(500).send("Error reading browse data");
    }

    const browseData = JSON.parse(file);

    res.json(browseData);
  });
});


router.get("/:id", (req, res) => {

  fs.readFile(filePath, "utf-8", (err, file) => {

    if (err) {
      return res.status(500).send("Error reading browse data");
    }

    const browseData = JSON.parse(file);

    const product = browseData.find(
      (item) => item.id === Number(req.params.id)
    );

    if (!product) {
      return res.status(404).send("Browse product not found");
    }

    res.json(product);

  });

});

module.exports = router;
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(process.cwd(),"data","gridCard.json");


router.get("/", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, file) => {
    if (err) {
      return res.status(500).send("Error reading grid card data");
    }

    const gridData = JSON.parse(file);

    res.json(gridData);
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, file) => {
    if (err) {
      return res.status(500).send("Error reading grid card data");
    }

    const gridData = JSON.parse(file);

    const product = gridData.find(
      (item) => item.id === Number(req.params.id)
    );

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.json(product);
  });
});

module.exports = router;
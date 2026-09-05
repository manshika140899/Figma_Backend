const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(
process.cwd(),
"data",
"relatedProducts.json"
);

router.get("/", (req, res) => {
fs.readFile(filePath, "utf-8", (err, file) => {
if (err) {
return res
.status(500)
.send("Error reading related products data");
}


try {
  const relatedProducts = JSON.parse(file);

  res.json(relatedProducts);
} catch (error) {
  res
    .status(500)
    .send("Invalid related products JSON");
}


});
});

router.get("/:id", (req, res) => {
fs.readFile(filePath, "utf-8", (err, file) => {
if (err) {
return res
.status(500)
.send("Error reading related products data");
}

try {
  const relatedProducts = JSON.parse(file);

  const product = relatedProducts.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res
      .status(404)
      .send("Related product not found");
  }

  res.json(product);
} catch (error) {
  res
    .status(500)
    .send("Invalid related products JSON");
}


});
});

module.exports = router;

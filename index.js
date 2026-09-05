const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const browseSec = require("./routes/browseSec");

const gridCard = require("./routes/gridCard");

app.use("/browseSec", browseSec);

app.use("/gridCard", gridCard);

const asgaardSofa = require("./routes/asgaardSofa");
app.use("/asgaardSofa", asgaardSofa);

const shop = require("./routes/shop");

app.use("/shop", shop);
const orders = require("./routes/orders");

app.use("/orders",orders)

app.use(express.static("public"));

const relatedProducts = require("./routes/relatedProducts");

app.use("/relatedProducts", relatedProducts);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
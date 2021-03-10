const express = require("express");
const foodRoute = require("./food.js");

const app = express();

app.use(express.json());
app.use(foodRoute);

app.listen(3000, () => console.log("Server is on port"));
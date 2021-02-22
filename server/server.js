const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const db = require("./models/index");
const app = express();
var cors = require('cors');
app.use(cors());
const router = require('./route/route')
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1',router)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const routes = require("./routes/api")

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes)

module.exports = app


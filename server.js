const express = require("express");
const app = express();
const compression = require("compression");
const history = require("connect-history-api-fallback");
app.use(history());
app.use(compression());
app.use("/", express.static(__dirname + "/dist"));
app.listen(5001, () => console.log("http://localhost:5001"));

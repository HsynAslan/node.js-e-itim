const http = require("http");
const routes = require("./routes");

const { error } = require("console");

var server = http.createServer(routes);

server.listen(5000);

console.log("node.js server at port 5000");

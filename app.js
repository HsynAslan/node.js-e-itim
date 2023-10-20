var http = require("http");
var fs = require("fs"); // html sayfalarını dahil etmek için
const { error } = require("console");

function requestListener(request, response) {
  //   response.setHeader("Content-Type", "text/plain");
  //   response.statusCode = 200;
  //   response.statusMessage = "OK";
  //   response.write("Ana Sayfa");

  // ********************************************

  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Anasayfa");
    response.end();
  } else {
    fs.readFile("pages/404.html", (error, html) => {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  }
}

var server = http.createServer(requestListener);

server.listen(5000);

console.log("node.js server at port 5000");

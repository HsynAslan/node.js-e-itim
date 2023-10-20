var fs = require("fs"); // html sayfalarını dahil etmek için

const routeHandler = (request, response) => {
  //   response.setHeader("Content-Type", "text/plain");
  //   response.statusCode = 200;
  //   response.statusMessage = "OK";
  //   response.write("Ana Sayfa");

  // ********************************************

  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Anasayfa");
    response.end();
  } else if (request.url == "/create" && request.method == "POST") {
    const data = [];
    request.on("data", (chunk) => {
      data.push(chunk);
    });
    request.on("end", () => {
      const result = Buffer.concat(data).toString();
      const parsedData = result.split("=")[1];
      console.log(parsedData);

      fs.appendFile("blogs.txt", parsedData, (err) => {
        if (err) console.log(err);
        else {
          response.statusCode = 302; // yönlendirme yapıcaz
          response.setHeader("Location", "/");
          response.end();
        }
      });
    });
  } else if (request.url == "/create") {
    fs.readFile("pages/create.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  } else {
    fs.readFile("pages/404.html", (error, html) => {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  }
};

module.exports = routeHandler;

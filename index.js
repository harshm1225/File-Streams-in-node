const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  if (req.url === "/") {
    fs.readFile(`${__dirname}/index.html`, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, {
          "Content-type": "text/html",
        });
        res.end(content);
      }
    });
  } else if (req.url === "/getfile") {
    fs.readFile(`${__dirname}/myinfo.txt`, (err, content) => {
      const readable = fs.createReadStream(`${__dirname}/myinfo.txt`);
      readable.pipe(res);
    });
  } else {
    res.writeHead(404);
    res.end("File Not Found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});

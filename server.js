const http = require("http");
const mongoose = require("mongoose");
const headers = require("./corsHeader");
const Post = require("./models/post");

const requestListener = (req, res) => {
  const { url, method } = req;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  if (url === "/" && method === "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        message: "Hello NodeJS Week 2",
      })
    );
    res.end();
  } else if (url === "/posts" && method === "GET") {
  } else if (url === "/posts" && method === "POST") {
  } else if (method === "OPTION") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "Not Found",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3003);

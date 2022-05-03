const http = require("http");
// const mongoose = require("mongoose");
const headers = require("./corsHeader");
const Post = require("./models/post");

require("./connections");

// mongoose.connect("mongodb://localhost:27017/hotel").then(() => {
//   console.log("連線成功");
// });

const requestListener = async (req, res) => {
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
    const posts = await Post.find();
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        posts,
      })
    );
    res.end();
  } else if (url === "/posts" && method === "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const newPost = await Post.create({
          name: data.name,
          content: data.content,
          type: data.type,
          tags: data.tags,
          image: data.image,
          likes: data.likes,
          comments: data.comments,
        });
        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "success",
            posts: newPost,
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "欄位有錯",
            error,
          })
        );
        res.end();
      }
    });
  } else if (url === "/posts" && method === "DELETE") {
    const posts = await Post.deleteMany({});
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        posts,
      })
    );
    res.end();
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
server.listen(process.env.PORT);

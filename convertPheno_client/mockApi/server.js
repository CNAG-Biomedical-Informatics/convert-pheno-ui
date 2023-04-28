// based on
// https://www.rahulpnath.com/blog/setting-up-a-fake-rest-api-using-json-server/#setting-up-json-server
// https://github.com/rahulpnath/quotes

import jsonServer from "json-server";
import data from "./mockData/index.js";

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

// routes
server.post("/submission/convert", (req, res) => {
  console.log(req.body);
  res.jsonp({"tempFilenames": ["tempFilename1", "tempFilename2"]});
});

server.post("/clinical/json", (req, res) => {
  console.log(req.body);
  res.jsonp({"json": data.table});
});

server.use(router);
server.listen(5001, () => {
  console.log("JSON Server is running");
});

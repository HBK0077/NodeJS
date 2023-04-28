var http = require("http");


var routes = require("./route");

const { connect } = require("http2");

var server = http.createServer(routes);

server.listen(4000);

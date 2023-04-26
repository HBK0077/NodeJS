//var name = "Hrishi";
var http = require("http");

var server = http.createServer((req,res)=>{
    console.log(req.headers,req.url, req.methods);
    res.setHeader("Content-type","text/html");
    res.write("<html><body><h1>HRISHI</h1></body></html>");
    //res.statusCode(200);
    res.end();
})

server.listen(4000);
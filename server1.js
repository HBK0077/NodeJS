var http = require("http");
var fs = require("fs"); 
const { connect } = require("http2");

var server = http.createServer((req,res)=>{
    //console.log(req.headers,req.url, req.method);
    var url = req.url;
    var method = req.method;
    if(url === "/"){
        fs.readFile("message.txt", {encoding:"utf-8"}, (err, data) => {
            if(err){
                console.log(err);
            }
            console.log("Data from file", +data);
            res.setHeader("Content-type","text/html");
            res.write("<html>");
            res.write("<head><title>Simple Test</title></head>");
            res.write(`<body>${data}</body>`);
            res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
        
        
        
        res.write("</html>");
        return res.end();
        });
    }
    else if(url === "/message" && method === "POST"){
        var body=[];
        //on methods helps us to listen to some events.
        //here data event will be fired when the new chunk is ready to be read.
        req.on("data", (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on("end",()=>{
            var parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            var message = parseBody.split("=")[1];
            fs.writeFile("message.txt", message,(err)=>{
                if(err){
                    console.log(err);
                }
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
        
    } 
    else{
        res.setHeader("Content-type","text/html");
    res.write("<html><body><h1>HRISHI</h1></body></html>");
    res.end();}
})

server.listen(4000);

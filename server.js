var http = require("http");

var server = http.createServer((req,res)=>{
    //console.log(req.headers,req.url, req.method);
    const url = req.url;
    if(url === "/"){
        res.setHeader("Content-type","text/html");
        res.write("<html>");
        res.write("<head><title>Simple Test</title></head>");
        res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
        res.write("</html>");
        return res.end();
    }
    else if(url === "/home"){
        res.setHeader("Content-type","text/html");
        res.write("<html>");
        res.write("<head><title>Home Page</title></head>");
        res.write("<body><h1>This is Home Page</h1></body>")
        //res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
        res.write("</html>");
        return res.end();
    }
    else if(url === "/about"){
        res.setHeader("Content-type","text/html");
        res.write("<html>");
        res.write("<head><title>About Page</title></head>");
        res.write("<body><h1>This is About Page</h1></body>")
        //res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
        res.write("</html>");
        return res.end();
    }
    else if(url === "/node"){
        res.setHeader("Content-type","text/html");
        res.write("<html>");
        res.write("<head><title>Node Page</title></head>");
        res.write("<body><h1>This is Node JS Page</h1></body>")
        //res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`);
        res.write("</html>");
        return res.end();
    }
    res.setHeader("Content-type","text/html");
    res.write("<html><body><h1>HRISHI</h1></body></html>");
    res.end();
})

server.listen(4000); 
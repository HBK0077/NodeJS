console.log("Hello World");

// writing the text to a file.

const fs = require("fs");

fs.writeFileSync("hello.txt", "hello from node.js");

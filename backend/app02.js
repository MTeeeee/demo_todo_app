console.log("Server Online");

const express = require("express");

const server = express();
const PORT = 3000;

server.get("/home", (req, res) => {
    console.log("ich bekomme einen get");
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>My Page</title></head>');
    res.write('<body><h1>My Page</h1></body>');
    res.write('</html>');
    res.end;
})


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

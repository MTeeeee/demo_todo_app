console.log("Server Online");

const express = require("express");

const server = express();
const PORT = 3000;

server.get("/", (req, res) => {
    console.log("ich bekomme einen get");
    res.status(200).json({ text: "hello from json"});
})


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

console.log("Server Online");

const express = require("express");
const cors = require("cors");
const fs = require("fs")

const server = express();
const PORT = 3000;

//Middleware
server.use(express.json());
server.use(cors());

server.get("/todos", (req, res) => {
    console.log("ich bekomme einen get");
    fs.readFile("./todos.json", "utf-8", (err, data) => {
        if (err) res.status(500).json({error: 'Datei konnte nicht gelesen werden'});
        let todos = JSON.parse(data);
        res.status(200).json(todos);
      });
})

server.post("/todos", (req, res) => {
    console.log("ich bekomme einen post");
    console.log(req.body);
    let newTodo = req.body;
    fs.readFile("./todos.json", "utf-8", (err, data) => {
        let todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("./todos.json", JSON.stringify(todos, null, 2), () => {
            res.status(200).json({success: 'Todo wurde abgespeichert'});
      });
    });
});


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

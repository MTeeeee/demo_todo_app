console.log("Server Online");

let todos = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    }
];


const express = require("express");

const server = express();
const PORT = 3000;

server.get("/", (req, res) => {
    console.log("ich bekomme einen get");
    res.status(200).json(todos);
})


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

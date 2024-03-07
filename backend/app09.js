console.log("Server Online");

// Module werden geladen:
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Client } = require("pg");

// Server wird erstellt und Port festgelegt
const server = express();
const PORT = 3000;

// Datenbank Verbindung

const db = new Client({
    user: "postgres",
    database: "todo_app_db",
    password: "",
    port: "5432",
    host: "localhost",
});

db.connect();

async function getTodos() {
    const res = await db.query("SELECT * FROM todos;")
    console.log(res.rows)
    return res.rows
}

//Middleware,
server.use(express.json());
server.use(cors());

// Ab hier definieren wir unsere Routen und was passieren soll wenn entsprechende Methode darauf eingeht.

// Dies ist die get Schnittstelle von der das Frontend alle aktuellen Todos bekommen soll
server.get("/todos", async(req, res) => {
    console.log("ich bekomme einen get");
    let todos = await getTodos()
    res.status(200).json(todos);

    // fs.readFile("./todos.json", "utf-8", (err, data) => {
    //     if (err) res.status(500).json({ error: 'Datei konnte nicht gelesen werden' });
    //     let todos = JSON.parse(data);
    //     res.status(200).json(todos);
    // });
})

// Definiert eine neue Route für den POST-Request auf den Pfad "/todos".
server.post("/todos", (req, res) => {
    console.log("ich bekomme einen post");
    console.log(req.body);
    let newTodo = req.body;

    fs.readFile("./todos.json", "utf-8", (err, data) => {
        let todos = JSON.parse(data);
        todos.push(newTodo);

        fs.writeFile("./todos.json", JSON.stringify(todos, null, 2), () => {
            res.status(200).json({ success: 'Todo wurde abgespeichert' });
        });
    });
});


// Definiert eine neue Route für den POST-Request".
server.post("/register", async (req, res) => {
    console.log("register new user");
    console.log(req.body);

    let userName = req.body.userName;
    let userPassword = req.body.userPassword;

    let hashedPassword = await bcrypt.hash(userPassword, 10)
    console.log(hashedPassword)

    const newUser = { userName, userPassword: hashedPassword };

    // Liest
    fs.readFile("./users.json", "utf-8", (err, data) => {
        let users = JSON.parse(data);
        users.push(newUser);
        // Schreibt
        fs.writeFile("./users.json", JSON.stringify(users, null, 2), () => {
            res.status(200).json({ success: 'User wurde registriert' });
        });
    });
});

server.post("/login", async (req, res) => {
    console.log("login user");
    console.log(req.body);

    let userName = req.body.userName;
    let userPassword = req.body.userPassword;

    let hashedPassword = await bcrypt.hash(userPassword, 10)
    console.log(hashedPassword)

    // Liest
    fs.readFile("./users.json", "utf-8", (err, data) => {
        let usersDb = JSON.parse(data);
        const user = usersDb.find(usr => usr.userName == userName);
        console.log(user)
        if (user !== undefined) {
            bcrypt.compare(userPassword, user.userPassword, function (err, result) {
                if (result) {

                    const token = jwt.sign(user, "123456");
                    res.status(200).json({
                        status: "Login Erfolgreich",
                        sessionToken: token
                    })
                } else {
                    res.status(404).json({ status: "Password incorrect" })
                }
            })
        } else {
            res.status(404).json({ status: "User Nonexistent" })
        }
    });
});


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

console.log("Server Online");

// Module werden geladen:
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Client } = require("pg");
const env = require("dotenv");

env.config();

// Server wird erstellt und Port festgelegt
const server = express();
const PORT = 3000;

// Datenbank Verbindung
const db = new Client({
    user: process.env.DB_USER,
    database: "todo_app_db",
    password: process.env.DB_PASSWORD,
    port: "5432",
    host: "localhost",
});

db.connect();

async function getTodos() {
    const res = await db.query("SELECT * FROM todos;")
    console.log(res.rows)
    return res.rows
}

async function postTodo(data) {
    const text = 'INSERT INTO todos(user_id, description, completed) VALUES($1, $2, $3) RETURNING *'
    const values = [data.user_id, data.description, data.completed]
    const res = await db.query(text, values)
    return res.rows
}

//Middleware,
server.use(express.json());
server.use(cors());

// Ab hier definieren wir unsere Routen und was passieren soll wenn entsprechende Methode darauf eingeht.

// Dies ist die get Schnittstelle von der das Frontend alle aktuellen Todos bekommen soll
server.get("/todos", async(req, res) => {
    res.status(200).json(await getTodos());
})

// Definiert eine neue Route für den POST-Request auf den Pfad "/todos".
server.post("/todos", async (req, res) => {
    res.status(200).json(await postTodo(req.body));
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

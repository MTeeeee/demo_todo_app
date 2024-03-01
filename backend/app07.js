console.log("Server Online");

// Module werden geladen:
const express = require("express");
const cors = require("cors");
const fs = require("fs")
const bcrypt = require("bcrypt")

// Server wird erstellt und Port festgelegt
const server = express();
const PORT = 3000;

//Middleware
// Middleware sind Funktionen die auf alle eingehenden Requests angewand werden.
// Requests durchlaufen alle Middleware Funktionen bevor sie zu den Routen gelangen.
server.use(express.json());
server.use(cors());

// Ab hier definieren wir unsere Routen und was passieren soll wenn entsprechende Methode darauf eingeht.

// Dies ist die get Schnittstelle von der das Frontend alle aktuellen Todos bekommen soll
server.get("/todos", (req, res) => {
    console.log("ich bekomme einen get");
    // Da die Todos in einer json Datei sind müssen wir gebrauch vom fs Modul machen um so diese Datei auszulesen.
    fs.readFile("./todos.json", "utf-8", (err, data) => {
        // Sollte es einen Fehler beim auslesen geben, wird ein Error zurückgesendet.
        if (err) res.status(500).json({error: 'Datei konnte nicht gelesen werden'});
        // Die json Datei wird zunächst in data geladen.
        // Damit wir sie mit Javascript Befehlen bearbeiten können müssen wir sie parsen.
        // Also aus einer Datei eine Object Variable machen.
        let todos = JSON.parse(data);
        // Dannach können wir alles als Response ans Frontend zurückschicken.
        res.status(200).json(todos);
      });
})

// Definiert eine neue Route für den POST-Request auf den Pfad "/todos".
server.post("/todos", (req, res) => {
    // Gibt eine Nachricht in der Konsole aus, um anzuzeigen, dass ein POST-Request empfangen wurde.
    console.log("ich bekomme einen post");
    // Gibt den Inhalt des Request-Bodys in der Konsole aus. Dies sollte das neue Todo-Element sein.
    console.log(req.body);
    // Speichert den Request-Body (das neue Todo-Element) in einer Variablen.
    let newTodo = req.body;

    // Liest die bestehende Todo-Liste aus der Datei "todos.json".
    fs.readFile("./todos.json", "utf-8", (err, data) => {
        // Parst die JSON-Daten aus der Datei in ein JavaScript-Objekt.
        let todos = JSON.parse(data);
        // Fügt das neue Todo-Element am Ende der Todo-Liste hinzu.
        todos.push(newTodo);

        // Schreibt die aktualisierte Todo-Liste zurück in die Datei "todos.json".
        fs.writeFile("./todos.json", JSON.stringify(todos, null, 2), () => {
            // Sendet eine Antwort mit dem Statuscode 200 (OK) zurück und gibt ein Erfolgsmeldung im JSON-Format zurück.
            res.status(200).json({success: 'Todo wurde abgespeichert'});
      });
    });
});


// Definiert eine neue Route für den POST-Request auf den Pfad "/todos".
server.post("/register", async(req, res) => {
    // Gibt eine Nachricht in der Konsole aus, um anzuzeigen, dass ein POST-Request empfangen wurde.
    console.log("register new user");
    // Gibt den Inhalt des Request-Bodys in der Konsole aus. Dies sollte das neue Todo-Element sein.
    console.log(req.body);
    // Speichert den Request-Body (das neue Todo-Element) in einer Variablen.

    let userName = req.body.userName;
    let userPassword = req.body.userPassword;

    let hashedPassword = await bcrypt.hash(userPassword, 10)
    console.log(hashedPassword)

    const newUser = { userName, userPassword: hashedPassword };

    // Liest die bestehende Todo-Liste aus der Datei "todos.json".
    fs.readFile("./users.json", "utf-8", (err, data) => {
        // Parst die JSON-Daten aus der Datei in ein JavaScript-Objekt.
        let users = JSON.parse(data);
        // Fügt das neue Todo-Element am Ende der Todo-Liste hinzu.
        users.push(newUser);

        // Schreibt die aktualisierte Todo-Liste zurück in die Datei "todos.json".
        fs.writeFile("./users.json", JSON.stringify(users, null, 2), () => {
            // Sendet eine Antwort mit dem Statuscode 200 (OK) zurück und gibt ein Erfolgsmeldung im JSON-Format zurück.
            res.status(200).json({success: 'User wurde registriert'});
      });
    });
});

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

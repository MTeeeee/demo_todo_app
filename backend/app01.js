// Hier haben wir gestartet


// In Node.js können wir Javascript schreiben.
// Die console stellt in diesem Fall unser Terminal dar.
console.log('Server Online');

// Node.js erlaubt uns mit dem Modul fs mit Dateien auf unserem System zu interagieren.
const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello from Node.js');


// Der Code ab hier startet einen Server
const http = require('http');

const server = http.createServer((req, res) => {
    // Über die Parameter req res können wir die eingehenden requests(req) verwenden
    // und die response(res) die zurückgesendet wird definieren.
    console.log(req.url)
    console.log(req.method)
    res.end('Hello From Node.js')
})

// Diese Zeile ist notwendig damit der Server nach dem Starten aktiv bleibt
// und weiter "hört" ob Anfragen(Requests) eingehen.
server.listen(3000)

// Ab hier sind noch ein paar Zeilen mit denen wir nützliche Prinzipien besprochen hatten.
// //############################
// function myFunction(req, res) {
//     console.log('hello from node')
// }
// const server = http.createServer(myFunction(req, res))
// //############################

// const server = http.createServer((req, res) => {
//     console.log('Hello From Server')
// })

// Hinweis: in Js gibt es unterschiedliche arten functions zu definieren
// Bsp. klassisch, arrow function und anonymous function

// function helloWorld(req, res) {
//     console.log('helloWorld1')
// }
// const helloWorld2 = (req, res) => {
//     console.log('helloWorld2')
// }
// helloWorld()
// helloWorld2()
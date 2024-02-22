console.log('Server Online');

const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello from Node.js');

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url)
    console.log(req.method)
    res.end('Hello From Node.js')
})

server.listen(3000)


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
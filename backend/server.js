const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const todosFilePath = path.join(__dirname, 'todos.json');

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Get all ToDo items
app.get('/todos', async (req, res) => {
    try {
        const todos = await fs.readJson(todosFilePath);
        res.json(todos);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, async () => {
    // await initializeTodosFile();
    console.log(`Server is running on http://localhost:${PORT}`);
});
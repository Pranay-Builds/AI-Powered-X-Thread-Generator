const express = require('express');
const app = express();

const aiRoutes = require('./routes/ai.routes');

app.use(express.json());

app.use('/ai', aiRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

module.exports = app;
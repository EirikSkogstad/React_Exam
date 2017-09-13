const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbName = 'movies';

mongoose.connect(`mongodb://localhost/${dbName}/`);

app.get('/movies', (req, res) => {
    res.send()
});
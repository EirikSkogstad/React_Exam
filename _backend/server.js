// Imports:
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const serverPort = 1234;
const dbName = 'movies';

// Mongoose config:
mongoose.connect(`mongodb://localhost/${dbName}/`);
const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true}
});
const movieModel = mongoose.model('Movie', movieSchema);



app.get('/movies', (req, res) => {
    movieModel.find((result, err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/pets', (req, res) => {
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    res.send(JSON.parse(data))
  })

})

app.listen(8000);


module.exports = app;

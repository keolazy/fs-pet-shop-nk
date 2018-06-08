const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
let petsPath = path.join(__dirname, 'pets.json');
let bodyParser = require('body-parser');

app.use(bodyParser.json())

app.get('/pets', (req, res) => {

   fs.readFile(petsPath, 'utf8', (err, data) => {
      res.send(JSON.parse(data))
    })
})
app.get('/pets/:id', (req, res) => {

   fs.readFile(petsPath, 'utf8', (err, data) => {
      if(err){
        console.error(err.stack);
        return res.send(500);
      }
      let id = Number.parseInt(req.params.id);

     if(id < 0 || id >= JSON.parse(data).length || Number.isNaN(id)){
        return res.sendStatus(404);
      }
      res.set('content-type', 'text/plain');
      res.send(JSON.parse(data)[id])
    })
})
app.post('/pets', (req, res) => {

 fs.readFile(petsPath, 'utf8', (err, data) => {
    if(err){
      return res.sendStatus(500);
    }
    let pets = JSON.parse(data);
    let pet = {
      "age": parseInt(req.body.age),
      "kind":req.body.kind,
      "name":req.body.name
    };
    pets.push(pet);
    let newPet = JSON.stringify(pets);

   fs.writeFile(petsPath, newPet, (err) => {
      if(err){
        return sendStatus(500);
      }
      res.set('content-type', 'text/plain');
      res.send(pet);
    })
  })
})

app.put('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    let id = Number.parseInt(req.params.id);
    let parsedPetData = JSON.parse(data)[id];

   let pet = {
      "age": parseInt(req.body.age),
      "kind":req.body.kind,
      "name":req.body.name
    };

   parsedPetData = pet;

   fs.writeFile('petsPath', parsedPetData, (err, data) => {
      if(err){
        return sendStatus(500);
      }
      res.set('content-type', 'text/plain');
      res.send(parsedPetData)
    })
  })
})

app.delete('/pets/:id', (req, res) => {

 fs.readFile(petsPath, 'utf8', (err, readData) => {
    let id = Number.parseInt(req.params.id);

   let newData = JSON.parse(readData);
    newData.splice(id, 1);
    let newerData = JSON.stringify(newData);
    console.log(newerData)
    fs.writeFile(petsPath, newerData, (err, data) => {
      res.set('content-type', 'text/plain');
      res.send(newerData);
      res.end()
    })
  })
})




app.use((req, res) => {
  res.sendStatus(404);
})
app.listen(8000);

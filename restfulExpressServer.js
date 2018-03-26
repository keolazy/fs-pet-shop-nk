'use strict'
// Routers = GET, POST, PUT


const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

let petsPath = path.join(__dirname, 'pets.json');
let bodyParser = require('body-parser');

// configure app to use bodyParser()

// Create an Express Route
// app.METHOD(path, handler)
// res.send('hello world') => sends text response to client
// Methods that response provides below
// res.download, res.json, res.jsonp, res.render, res.sendFile

app.use(bodyParser.json());


app.get('/pets', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      res.send(JSON.parse(data))
    })
})

app.get('/pets/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if(err){
        console.error(err.stack);
        return res.sendStatus(500);
      }
      let id = Number.parseInt(req.params.id);
      if(id < 0 || id >= JSON.parse(data).length || Number.isNaN(id)){
        return res.sendStatus(404);
      }
      res.set('content-type', 'text/plain');
      res.send(JSON.parse(data)[id])
    })
})
// can store entire or statement as a variable


app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    let validBody = req.body.name || req.body.age || (req.body.age) || req.body.kind;
    let noBody = !req.body.name && !req.body.age && !req.body.kind;

    if(err){
      return res.sendStatus(500);
    }

    if(!validBody) {
      return res.sendStatus(400)
    }
    else if(noBody) {
      return res.sendStatus(404)
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
    let id= Number.parseInt(req.params.id);
    let parsedPetData = JSON.parse(data)[id]; // parsed data

    let pet = {
      "age": parseInt(req.body.age),
      "kind":req.body.kind,
      "name":req.body.name
    };

    parsedPetData = pet;

  fs.writeFile('petsPath', parsedPetData, (err, data) => {
      if(err) {
        return sendStatus(500);
      }
      res.set('content-type', 'text/plain');
      res.send(parsedPetData);
    })
  })
})

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, readData) => {
      let id = Number.parseInt(req.params.id);

      let newData = JSON.parse(readData);
      newData.splice(id,1);
      let newerDta = JSON.stringify(newData);
      console.log(newData)

  fs.writeFile(petsPath, newData, (err, data) => {
    res.set('content-type', 'text/plain');
    res.send(newData);
    res.end();
    })
  })
})


app.use((req, res) => {
  res.sendStatus(404);
})
app.listen(8000);

'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
const superagent = require('superagent'); // or axios.
require('dotenv').config();
const mongoose = require('mongoose');


const PORT = process.env.REACT_APP_PORT || 3099;

server.use(cors());
server.use(express.json());

// Get Data From API.
class psiPower {
    constructor(val) {
        this.description = val.description;
        this.name = val.name;
        this.img = val.img;
    }
}
class allCharacters {
    constructor(val) {
        this.gender = val.gender;
        this.name = val.name;
        this.img = val.img;
        const allPower = val.psiPowers.map(data => new psiPower(data));
        this.psiPowers = allPower;
        this.id = val._id;
    }
}
const getAllData = (req, res) => {
    const url = 'https://psychonauts-api.herokuapp.com/api/characters';
    superagent.get(url).then(data => {
        const allCard = data.body.map(data => new allCharacters(data));
        res.send(allCard);
    }).catch(error => res.send(error));
}

// EndPoint:
server.get('/get-characters', getAllData);

// Mongo DB:
mongoose.connect('mongodb://localhost:27017/characters', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Characters = new mongoose.Schema({
    gender: String,
    name: String,
    img: String,
    psiPowers: [{ description: String, name: String, img: String }],
    id: [{ type: String, unique: true }]
})
const CharactersModelMongoose = mongoose.model('characters', Characters);

// Add:
const addFav = (req, res) => {
    const { gender, name, img, psiPowers, id } = req.body;
    console.log('Body data' , req.body.psiPowers);
    CharactersModelMongoose.find({ id:id }, (error, charcter) => {
        console.log(charcter);
        if (charcter.length > 0)
            res.send('the character is already in the favorite list ');
        else {
            const newFavChar = new CharactersModelMongoose({
                name: name,
                gender: gender,
                psiPowers: psiPowers,
                img: img,
                id: id,
            })
            newFavChar.save();
            res.send(newFavChar);
        }
    })
}

// EndPoint:
server.post('/favorite', addFav);

// Get:
const getFav = (req, res) => {
    CharactersModelMongoose.find({}, (error, charcter) => {
        res.send(charcter);
    })
}

// EndPoint:
server.get('/favorite', getFav);

// Update:
const updateFav = (req, res) => {
    const id = req.params.id;
    const { name, gender } = req.body;
    CharactersModelMongoose.find({ id: id }, (error, favChar) => {
        favChar[0].name = name;
        favChar[0].gender = gender;
        favChar[0].save();
        res.send(favChar[0]);
    })
}

// EndPoint:
server.put('/favorite/:id', updateFav);

// Delete:
const deleteFav = (req, res) => {
    const id = req.params.id;
    CharactersModelMongoose.findOneAndRemove({ id: id }, (error, deletedChar) => {
        res.send(`the character has been deleted successfully  ${deletedChar}`);
    })
}

// endPoint:
server.delete('/favorite/:id', deleteFav);

// 1: Fixed
server.get('/', (req, res) => {
    res.send('everything is working!');
});



// Listen:
server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
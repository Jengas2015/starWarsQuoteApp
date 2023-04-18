const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let dbConnectionStr = process.env.DB_STRING



MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to Database")
        const db = client.db("star-wars-quotes")
        const quotesCollection = db.collection("quotes")
        app.use(bodyParser.urlencoded({extended:true}))

        app.listen(3000, function () {
            console.log("listening on 3000")
        })

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

        app.post('/quotes', (req, res) => {
            quotesCollection
            .insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
    })


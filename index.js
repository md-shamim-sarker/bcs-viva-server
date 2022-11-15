const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.egsefuu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run() {
    try {
        const questionsCollection = client.db("bcsViva").collection("questionsCollection");

        // C from CRUD
        app.post('/questions', async (req, res) => {
            const questions = req.body;
            console.log(questions);
            const result = await questionsCollection.insertOne(questions);
            res.send(result);
        });

        // R from CRUD
        app.get('/questions', async (req, res) => {
            const query = {};
            const cursor = questionsCollection.find(query);
            const results = await cursor.toArray();
            res.send(results);
        });
    } catch(error) {
        console.log(error);
    }
}

run().catch(err => {
    console.log(err.message);
});

app.get('/', (req, res) => {
    res.send('Server is working fine!!!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
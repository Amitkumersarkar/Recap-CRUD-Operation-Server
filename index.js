const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 1500;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// basic server setup
app.get('/', (req, res) => {
    res.send("Hello Developer")
})

// mongodb connection
const uri = "mongodb+srv://recap:NB7xRmqxdWemoMvg@cluster0.xqgbxlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('New Users', user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run().catch(console.dir);

// to run this server
app.listen(port, () => {
    console.log(`The server is running onm port : ${port}`)
})
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "https://astronomy-faq.netlify.app", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.listen(PORT, () => console.log(`Server running at localhost:${PORT}!`));
let database;
let collection;

app.get("/", (req, res) => {
    res.send("🚀 Backend is running!");
});

app.post('/create', (req) => {
    database = req.body.data.dbname;
    collection = req.body.data.colname;

    // const DataBase = `mongodb://localhost:27017/${database}`;
    const DataBase = `${uri}/${database}`;
    mongoose.set('strictQuery', true);
    const schema = collection = new mongoose.Schema({
        question: String,
        answer: String,
    });
    //const course = mongoose.model(collection, schema);
    const course = mongoose.models.astro || mongoose.model('astro', schema);
    mongoose.connect(DataBase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
    const db = mongoose.connection;
    db.on('error', (err) => { console.log(err); })
    db.once('open', () => {
        app.post('/insert', (req, res) => {
            let input = req.body.data;
            course.create(input)
                .then(
                    result => {
                        res.send({ "message": 'Record added' });
                    })
                .catch(err => {
                    console.log(err);
                });
        });
        app.post('/batchLoad', (req, res) => {
            let input = req.body.data;
            course.insertMany(input)
                .then(
                    result => {
                        res.send({ "message": 'Records added' });
                    })
                .catch(err => {
                    console.log(err);
                });
        });
        app.get('/retrieve', (req, res) => {
            let input = req.query;
            course.find(input)
                .then(
                    result => {
                        res.send(result);
                    })
                .catch(err => {
                    console.log(err);
                });
        });
        app.put('/update', (req, res) => {
            let id = req.body.id;
            let input = req.body.data;
            course.updateOne({ _id: id },
                { $set: input },
                { runValidators: true })
                .then(
                    result => {
                        res.send({ "message": 'Record updated' });
                    })
                .catch(err => {
                    console.log(err);
                });
        });

        app.post('/delete', (req, res) => {
            let input = req.body.data;
            course.deleteOne(input)
                .then(
                    result => {
                        res.send({ "message": 'Record deleted' });
                    })
                .catch(err => {
                    console.log(err);
                });
        });
        app.delete('/deleteAll', (req, res) => {
            course.deleteMany()
                .then(
                    result => {
                        res.send({ "message": 'Record deleted' });
                    })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

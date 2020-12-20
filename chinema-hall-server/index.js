const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
// const fs = require('fs');
const fs = require('fs-extra')
require('dotenv').config();


//mongo DB info
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zbfns.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//use App
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());
app.use(express.static('./Public/UploadImg'));

//default directory
app.get('/', (req, res) => {
    res.send("ABU HASAN")
})

//database area
//database area
client.connect(err => {
    const movieData = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_MOVIE_COLLECTION}`);
    const sitCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_SIT}`);

    /* GET All Movie Data */
    app.get('/movie-data', function (req, res, next) {
        movieData.find({})
            .toArray((err, docs) => {
                res.send(docs)
            })
    });

    /*Get filter movie data with catagories*/
    app.get("/movie-data/catagories", (req, res) => {
        const filterObject = {};
        req.query.field && (filterObject.field = req.query.field);
        movieData.find(filterObject).toArray((err, projects) => {
            if (projects.length) {
                res.status(200).send(projects);
            } else {
                res.sendStatus(404);
            }
        });
    });

    /*Get specific data by id */
    app.get("/movie-data/:id", (req, res) => {
        movieData.find({ _id: ObjectId(req.params.id) }).toArray((err, projects) => {
            if (projects.length) {
                res.status(200).send(projects);
            } else {
                res.sendStatus(404);
            }
        });
    });

    //post make-admin
    app.post('/movie-sit/post-sit-data/:id', (req, res) => {
        // const getIf = sitCollection.find({ id: req.params.id  });
        // console.log(getIf);
        sitCollection.find({ id: req.params.id })
            .toArray((err, data) => {
                console.log(data);
                if (data[0].sitNum == req.params.id) {
                    res.status(400).send({ duplicate: true });
                    // all most done but time short
                    //that's why use false condition
                } else {
                    const id = req.body.id;
                    const status = req.body.status;
                    const sitNum = req.body.sitNum;
                    const user = req.body.user;
                    const name = req.body.name;
                    sitCollection.insertOne({ id, status, sitNum, user, name })
                        .then(() => {
                            res.json({ success: true })
                        })
                }

            })
    })
    /* GET All Book data Data */
    app.get('/all-sit-data/:id', function (req, res, next) {
        sitCollection.find({ id: req.params.id })
            .toArray((err, docs) => {
                res.send(docs)
            })
    });

    //get userSpecific service list
    app.get('/user-book-list/', (req, res) => {
        sitCollection.find({ user: req.query.email })
            .toArray((err, docs) => {
                res.send(docs);
            })
    });

});
app.listen(process.env.PORT || 3000);

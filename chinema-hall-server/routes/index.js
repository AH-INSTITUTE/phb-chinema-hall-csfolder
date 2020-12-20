var express = require('express');
var router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs-extra');
const app = require('../app');
require('dotenv').config();


//mongo DB info
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zbfns.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("ABU HASAN");
});

//database area
client.connect(err => {
  const adminData = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_ADMIN_COLLECTION}`);

  // const MyName = "ABU HASAN";
  // adminData.insertOne({ MyName })
  //   .then(() => {
  //     console.log("Name UP SUCCESS");
  //   })

  console.log("data cnnect");
});

module.exports = router;

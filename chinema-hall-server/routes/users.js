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

//database area
client.connect(err => {
  const adminData = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_ADMIN_COLLECTION}`);

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    adminData.find({})
      .toArray((err, docs) => {
        res.send(docs)
      })
  });

  console.log("data cnnect");
});

module.exports = router;

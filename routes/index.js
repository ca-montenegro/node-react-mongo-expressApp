var express = require("express");
var router = express.Router();

/* Connect to MongoDB*/

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";


const findDocuments = function(db, query,callback) {
  // Get the documents collection
  const collection = db.collection("tweets");
  // Find some documents
  collection.find(query).toArray(function(err, docs) {
    console.log(query);
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs.length);
    callback(docs);
  });
};


function getFollowers(query,callback){
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    findDocuments(db,query, callback);

    client.close();
  });
}
// Database Name
const dbName = "twitter";

// Use connect method to connect to the server



/* GET home page. */
router.get("/:user", function(req,res){
  getFollowers(
    {"user.screen_name":req.params.user}, 
    (followers) => { 
      res.send(followers);
    });});

module.exports = router;

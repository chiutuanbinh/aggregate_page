var express = require('express');
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let config = require('../modules/config');
const assert = require('assert').strict;

let articles = ["zolo", 'zuluu', 'zala'];
let mongodb;
MongoClient.connect(config.mongo_connection_string, {
    poolSize:10
}, function(err, db){
    assert.equal(null, err);
    mongodb = db;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  let dbo = mongodb.db(config.mongo_db_name)
  dbo.collection(config.mongo_article_collection).find({'id': {"$ne" :""}}).limit(100).toArray(function(err, result){
    if (err) throw err;
    // console.log(result[0].nlp)  
    articles = result;
    // z = []
    // for (a in articles){
    //   z.push(JSON.stringify(a))
    // }
    z = JSON.parse(JSON.stringify(result))
    res.render('index', { title: 'VnExpress' , article:result});
  })
  
});

module.exports = router;

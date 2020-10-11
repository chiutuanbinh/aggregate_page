var express = require('express')
let MongoClient = require('mongodb').MongoClient
let config = require('../modules/config')
let router = express.Router()
const assert = require('assert').strict;

let mongodb;
MongoClient.connect(config.mongo_connection_string, {
    poolSize:10
}, function(err, db){
    assert.equal(null, err);
    mongodb = db;
})

router.get('/single/:articleid', function(req, res, next){
    let dbo = mongodb.db(config.mongo_db_name)
    dbo.collection(config.mongo_article_collection).findOne({id:req.params.articleid}, function(err, result) {
        if (err) throw err;
        console.log( JSON.stringify(result))
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result))
    })
})

router.get('/latest', function(req, res, next){
    let dbo = mongodb.db(config.mongo_db_name)
    dbo.collection(config.mongo_article_collection).find().limit(100).toArray(function(err, result){
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result))
    })
})

module.exports = router
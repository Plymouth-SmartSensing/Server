var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var d3 = require('d3');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "smartsensor",
  database : 'data'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/* GET home page. */
router.get('/app', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('d3');
});

router.get('/app/data', function(req, res, next) {
  con.query('SELECT * FROM data', function(err, result){
    if(err){
      res.send('Error');
    }else{
      res.send(result);
    }
  });
});

router.post('/app/data/new', function(req, res){
  var id = req.body.id;
  var value = req.body.value;
  con.query('INSERT INTO data (id, value) VALUES (?, ?)', [id,value], function(err, result){
    if(err){
      res.send('Error');
    }else{
      res.send(result);
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next){
  
});

module.exports = router;

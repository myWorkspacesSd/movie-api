var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;

  const user = new User(req.body);
	const promise = user.save();

  promise.then(() => {
    res.json({
      message: 'Success'
    });
  }).catch((err) =>{
    res.json({
      message: err.message
    });
  });
});


router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({username, password}, (err, user) =>{
    if(user){
      const token = jwt.sign(username, req.app.get('api_secret_key'));
      res.json({
        token
      });
    }else{
      res.json({
        message: 'user was not found'
      });
    }
});
});

router.get('/', (req, res) => {
  res.send('Anasayfa')
});

module.exports = router;



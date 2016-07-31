var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});
router.post('/login', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;

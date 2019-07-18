const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.status(200).json({msg: 'pong', date: new Date()});
});

router.get('/blog-post', (req, res) => {
  res.status(200)
});

module.exports = router;


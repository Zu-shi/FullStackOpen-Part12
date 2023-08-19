const redisIndex = require('../redis/index')
const express = require('express');
const router = express.Router();

const configs = require('../util/config')

/* GET index data. */
router.get('/', async (req, res) => {
  const todos = await redisIndex.getAsync("todos-added")
  const result = { "todos-added": todos }

  res.json(todos)
});

module.exports = router;
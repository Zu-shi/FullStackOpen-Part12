const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redisIndex = require('../redis/index')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  const result = await redisIndex.setAsync("todos-added", todos.length)
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  console.log('id')
  console.log(id)
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo).status(200).end(); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const result = await req.todo.save()
  const todos = await Todo.find({})
  const result2 = await redisIndex.setAsync("todos-added", todos.length)

  res.send(result).status(200).end();
  // res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

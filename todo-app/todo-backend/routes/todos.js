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
  console.log("test1")
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
router.put('/:id', async (req, res) => {

  const { id } = req.params
  console.log('body')
  console.log(id)
  console.log(req.body)
  req.todo = await Todo.findById(id)

  if (!req.todo) {
    const result = new Todo({
      ...req.todo,
      "_id": id
    }).save()
    const todos = await Todo.find({})
    let num = await redisIndex.getAsync("todos-added")
    console.log(num)
    num = num == null ? 0 : parseInt(num)
    const result2 = await redisIndex.setAsync("todos-added", num + 1)

    res.send(result).status(200).end();
  }
  else {
    res.send(req.todo).status(200).end();
  }
  // res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

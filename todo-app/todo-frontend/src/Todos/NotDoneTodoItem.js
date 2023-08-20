import React from 'react'

const onClickDelete = (todo) => () => {
  deleteTodo(todo)
}

const onClickComplete = (todo) => () => {
  completeTodo(todo)
}

const NotDoneTodoItem = (todo, deleteTodo, completeTodo) => {
  return (
    <div>
      <>
        <span>
          This todo is not done
        </span>
        <span>
          <button onClick={onClickDelete(todo)}> Delete </button>
          <button onClick={onClickComplete(todo)}> Set as done </button>
        </span>
      </>
    </div>
  )
}

export default NotDoneTodoItem
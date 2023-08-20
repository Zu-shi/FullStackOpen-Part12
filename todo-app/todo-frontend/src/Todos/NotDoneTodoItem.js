import React from 'react'

const NotDoneTodoItem = ({ todo, deleteTodo, completeTodo }) => {

  const onClickDelete = () => {
    deleteTodo(todo)
  }

  const onClickComplete = () => {
    completeTodo(todo)
  }

  return (
    <div>
      <>
        <span>
          This todo is not done
        </span>
        <span>
          <button onClick={onClickDelete}> Delete </button>
          <button onClick={onClickComplete}> Set as done </button>
        </span>
      </>
    </div>
  )
}

export default NotDoneTodoItem
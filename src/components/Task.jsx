import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa"

const Task = ({ task, index, deleteTask, getSingleTask, taskToComplete }) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1} . </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => taskToComplete(task)} />
        <FaEdit color="red" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="blue" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  )
}

export default Task

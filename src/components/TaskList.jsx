import { useEffect, useState } from "react"
import Task from "./Task.jsx"
import TaskForm from "./TaskForm.jsx"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { URL } from "../App.js"
import loadingImg from "../assets/loadImg.gif"
import { FaAffiliatetheme, FaFontAwesomeFlag } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskId] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    completed: false
  })
  const { name } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData, [name]: value
    })

  }
  const getTasks = async () => {
    // setIsLoading(true)
    try {

      const res = await axios.get(`${URL}/api/tasks`)
      setTasks(res.data)
      //  setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  })

  const createTask = async (e) => {
    e.preventDefault()
    if (name === "") {
      return toast.error("Input can not be empty")
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData)
      setFormData({ ...formData, name: "" })
      toast.success("Task added successfully")
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      getTasks()

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const cTasks = tasks.filter((task) => {
      return task.completed === true
    })
    setCompletedTasks(cTasks)
  }, [tasks])

  const getSingleTask = (task) => {
    setFormData({ name: task.name, completed: false })
    setTaskId(task._id)
    setIsEditing(true)
  }

  const updateTask = async (e) => {
    e.preventDefault()
    if (name === "") {
      return toast.error("Input can't be empty")
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData)
      setFormData({ ...formData, name: "" })
      setIsEditing(false)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const taskToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true
    }

    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }

  }



  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        {tasks.length > 0 && (
          <p>
            <b> Total Tasks:</b> {tasks.length}
          </p>
        )}

        <p>
          <b> Completed Tasks:</b> {completedTasks.length}
        </p>
      </div>
      <hr />
      {
        isLoading && (
          <div className="--flex-center">
            <img src={loadingImg} alt='Loading' />
          </div>
        )}

      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No Task added.Please add a task </p>
      ) : (
        <>
          {
            tasks.map((task, index) => {
              return (
                <Task key={task._id}
                  task={task}
                  index={index}
                  deleteTask={deleteTask}
                  getSingleTask={getSingleTask}
                  taskToComplete={taskToComplete} />
              )
            })
          }
        </>

      )}

    </div>
  )
}

export default TaskList

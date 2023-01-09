import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrash
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { Placeholder } from 'reactstrap';

function App() {

  const [todo, setToDo] = useState([
    { "id": 1, "title": "Task 1", "status": true },
    { "id": 2, "title": "Task 2", "status": false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  const addTask = () => {
    if (newTask) {
      let num = todo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...todo, newEntry]);
      setNewTask('');
    }
  }

  const deleteTask = (id) => {
    let newTasks = todo.filter(task => task.id !== id);
    setToDo(newTasks);
  }

  const markDone = (id) => {
    let newTasks = todo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTasks)
  }

  const cancelUpdate = (id) => {
    setUpdateData('');
  }

  const chageTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  const updateTask = () => {
    let filterRecords = [...todo].filter(task => task.id !== updateData.id)
    let updateObject = [...filterRecords, updateData]
    setToDo(updateObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <br /><br />
      <h2>To Do List (ReactJS)</h2>
      <br /><br />

      <div className="row">
        <div className="col">
          <input
            value={updateData && updateData.title}
            onChange={(e) => chageTask(e)}
            placeholder='edit your task'
            className="form-control form-control-lg" />
        </div>
        <div className="col-auto">
          <button
            onClick={updateTask}
            className="btn btn-lg btn-success mr-20">Update
          </button>
          <button
            onClick={cancelUpdate}
            className="btn btn-lg btn-warning">Cancel
          </button>
        </div>
      </div><br />

      <div className="row">
        <div className="col">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='add your task'
            className="form-control form-control-lg" />
        </div>
        <div className="col-auto">
          <button
            onClick={addTask}
            className="btn btn-lg btn-success">Add Task</button>
        </div>
      </div><br />

      {todo && todo.length ? '' : 'No Tasks...'}

      {todo && todo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <Fragment>

              <div className="col task-bg">
                <div className={task.status ? 'done' : ''}>
                  <span className="task-number">{index + 1}</span>
                  <span className="task-text">{task.title}</span>
                </div>

                <div className="icon-wrap">
                  <span
                    onClick={() => markDone(task.id)}
                    title='Completed / Not Completed'><FontAwesomeIcon icon={faCircleCheck} />
                  </span>

                  {task.status ? null : (
                    <span
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}
                      title='Edit'><FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span
                    onClick={() => deleteTask(task.id)}
                    title='Delete'><FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>

              </div>

            </Fragment>
          )
        })}
    </div>
  );
}

export default App;

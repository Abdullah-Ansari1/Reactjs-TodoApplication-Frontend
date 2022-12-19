import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import { toast } from 'react-toastify';
import { fetchTodos, deleteTodo, updateTodo } from '../redux/reducers/todoReducers';
import { UilEdit, UilTrashAlt, UilTimes } from '@iconscout/react-unicons'
const Todos = () => {
  const todosData = useSelector(state => state.todos);
  const [editTodo, setEditTodo] = useState({ id: "", title: "", status: "", due_Date: "" });
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [today, setToday] = useState('');
  const [statusArray, setStatusArray] = useState(["COMPLETED", "PENDING", "DELAYED"]);

  const { loading, todos, message } = todosData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
    getDate();
    // eslint-disable-next-line 
  }, [message]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setDelModal(true);
    setEditTodo({ id: id, title: "", status: "", due_Date: "" })
  }
  const confirmDelete = () => {
    dispatch(deleteTodo(editTodo.id));
    setDelModal(false);
    setEditTodo({ id: "", title: "", status: "", due_Date: "" });
    toast.info("Todo deleted Successfully");
  }
  const handleUpdate = (todo, e) => {
    e.stopPropagation();
    let dueDateformat = moment(todo.due_Date).format('YYYY-MM-DD');
    setEditTodo({ id: todo._id, title: todo.title, status: todo.status, due_Date: dueDateformat });
    setStatusArray(statusArray.filter(item => { return item !== todo.status }));
    setEditModal(true);
  }
  const handleSave = (e) => {
    e.preventDefault();
    const { id, title, status, due_Date } = editTodo;
    dispatch(updateTodo({ id, title, status, due_Date }))
    setEditModal(false);
    setEditTodo({ id: "", title: "", status: "", due_Date: "" });
    setStatusArray(["COMPLETED", "PENDING", "DELAYED"]);
    toast.info("Todo Updated Successfully");
  }
  const onChange = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value })
  }

  const getDate = () => {
    let todayDate = new Date();
    let dd = todayDate.getDate();
    let mm = todayDate.getMonth() + 1;
    let yyyy = todayDate.getFullYear();
    todayDate = yyyy + '-' + mm + '-' + dd;
    setToday(todayDate);

  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todos</h1>
      <div className="todos">
        {!loading ? todos.length !== 0 ? todos.map((item) => (
          <div className="todo" key={item._id}>
            <div className={`todo__status ${item.status}`}><span>{item.status}</span></div>
            <h2 className="todo__title">Title:{item.title.length>20?`${item.title.slice(0, 20)}...`:item.title}</h2>
            <p className={`todo__apply ${item.status}`}>
              <span>Due Date:</span> {moment(item.due_Date).format('LL')}
            </p>
            <div className='todo-icons-edit-delete'><UilEdit style={{ marginLeft: "10px", cursor: "pointer" }} onClick={(e) => { handleUpdate(item, e) }} /><UilTrashAlt style={{ marginLeft: "10px", cursor: "pointer" }} onClick={(e) => { handleDelete(item._id, e) }} /></div>
          </div>
        )) : "No Todos To Show" : "Loading..."
        }
      </div>
      {/* Update Todo Modal */}
      {editModal ? <>
        <div className="updateTodo__modal active-modal">
          <div className="updateTodo__modal-content">
            <h4 className="updateTodo__modal-title">Update Todo</h4>
            <UilTimes className="updateTodo__modal-close" onClick={() => { setEditModal(false); setEditTodo({ id: "", title: "", status: "", due_Date: "" }); setStatusArray(["COMPLETED", "PENDING", "DELAYED"]); }} />
            <form className="form-Data">
              <div className="input-Data">
                <label htmlFor="title">Title</label>
                <input type="text" placeholder='add title...' id="title" name="title" value={editTodo.title} aria-describedby="emailHelp" onChange={onChange} required />
              </div>
              <div className="input-Data">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" onChange={onChange}>
                  <option value={editTodo.status}>{editTodo.status}</option>
                  {statusArray.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="input-Data">
                <label htmlFor="due_Date">Due Date</label>
                <input type="date" id="due_Date" name="due_Date" value={editTodo.due_Date} onChange={onChange} min={today} required />
              </div>
              <button disabled={editTodo.title === "" || editTodo.due_Date === "" ? true : false} style={editTodo.title === "" || editTodo.due_Date === "" ? null : { background: "#19578d", color: "white" }} type="submit" className="editTodo-btn" onClick={handleSave}>Update Todo</button>
            </form>
          </div>
        </div>
      </> : null}
      {/* DELETE MODAL */}
      {delModal ? <>
        <div className="updateTodo__modal active-modal del">
          <div className="updateTodo__modal-content delmodel">
            <h4 className="delTodo__modal-title">Are You Sure You want to delete the todo?</h4>
            <UilTimes className="updateTodo__modal-close" onClick={() => { setDelModal(false); setEditTodo({ id: "", title: "", status: "", due_Date: "" }); }} />
            <div className='del-btns'>
              <button className="del-btn1" onClick={confirmDelete} >Yes</button>
              <button className="del-btn2" onClick={() => { setDelModal(false); setEditTodo({ id: "", title: "", status: "", due_Date: "" }); }}>Cancel</button>
            </div>
          </div>
        </div>
      </> : null}
    </div>
  )
}

export default Todos
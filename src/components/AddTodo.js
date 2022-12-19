import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { createTodo } from '../redux/reducers/todoReducers';
const AddTodo = () => {
    const todomessage = useSelector(state => state.todos.message);
    const [today, setToday] = useState('');
    const [addtodo, setAddtodo] = useState({ title: "", status: "PENDING", due_Date: "" });
    const dispatch = useDispatch();

    useEffect(() => {
        todomessage !== "" && toast.info(todomessage);
        getDate();
    }, [todomessage])

    const handleClick = (e) => {
        e.preventDefault();
        const { title, status, due_Date } = addtodo;
        dispatch(createTodo({ title, status, due_Date }));
        setAddtodo({ title: "", status: "PENDING", due_Date: "" })
    }

    const onChange = (e) => {
        setAddtodo({ ...addtodo, [e.target.name]: e.target.value })
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
        <div className="container">
            <h2>Add a Todo</h2>
            <form className="form-Data">
                <div className="input-Data">
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='add title...' id="title" name="title" value={addtodo.title} aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="input-Data">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" onChange={onChange}>
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="DELAYED">DELAYED</option>
                    </select>
                </div>
                <div className="input-Data">
                    <label htmlFor="due_Date">Due Date</label>
                    <input type="date" id="due_Date" name="due_Date" value={addtodo.due_Date} onChange={onChange} min={today} required />
                </div>
                <button disabled={addtodo.title === "" || addtodo.due_Date === "" ? true : false} style={addtodo.title === "" || addtodo.due_Date === "" ? null : { background: "#19578d", color: "white" }} type="submit" className="addtodo-btn" onClick={handleClick}>Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
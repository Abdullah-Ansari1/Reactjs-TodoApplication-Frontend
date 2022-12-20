import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { createTodo,SetToday} from '../redux/reducers/todoReducers';
const AddTodo = () => {
    const {message,today,statusArray} = useSelector(state => state.todos);
    const [addtodo, setAddtodo] = useState({ title: "", status: "PENDING", due_Date: "" });
    const dispatch = useDispatch();

    useEffect(() => {
        message !== "" && toast.info(message);
        dispatch(SetToday());
        // eslint-disable-next-line 
    }, [message])

    const handleCreateTodo = (e) => {
        e.preventDefault();
        const { title, status, due_Date } = addtodo;
        dispatch(createTodo({ title, status, due_Date }));
        document.getElementById("status").options.selectedIndex=0;
        setAddtodo({ title: "", status: "PENDING", due_Date: "" })
    }

    const onChange = (e) => {
        setAddtodo({ ...addtodo, [e.target.name]: e.target.value })
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
                        {statusArray.map((item,index)=>(
                        <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="input-Data">
                    <label htmlFor="due_Date">Due Date</label>
                    <input type="date" id="due_Date" name="due_Date" value={addtodo.due_Date} onChange={onChange} min={today} required />
                </div>
                <button disabled={addtodo.title === "" || addtodo.due_Date === "" ? true : false} style={addtodo.title === "" || addtodo.due_Date === "" ? null : { background: "#19578d", color: "white" }} type="submit" className="addtodo-btn" onClick={handleCreateTodo}>Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo
import React from 'react'
import "./App.css";
import AddTodo from './components/AddTodo';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todos from './components/Todos';
import Header from './components/Header';
const App = () => {
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
        <Route exact path='/' element={<AddTodo/>} />
        <Route exact path='/todos' element={<Todos/>} />
        </Routes>
        <ToastContainer/>
      </Router>
    </div>
  )
}

export default App
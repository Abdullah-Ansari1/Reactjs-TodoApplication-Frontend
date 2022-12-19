import React from 'react'
import {Link,useLocation} from "react-router-dom";
const Header = () => {
  const location=useLocation();  
  return (
    <div>
        <ul className='header__ul'>
            <li>
                <Link to="/" className={location.pathname==="/"?"header__li  header__active":"header__li"}>Add Todo</Link>
            </li>
            <li >
                <Link to="/todos" className={location.pathname==="/todos"?"header__li header__active":"header__li"}>Todos</Link>
            </li>
        </ul>
    </div>
  )
}

export default Header
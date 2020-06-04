import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    
    return (
        <div className="nav-bar">
            {/* <Link to="/">Home</Link> */}
            <Link to="/profile">Profile</Link>
            <Link to="/mycourses">My Courses</Link>
            <Link to="/getcourses">Get Courses</Link> 
            <Link to="/" onClick={() => props.setCurrentUser(null)}>Logout</Link> 
        </div>
    )
}
  
export default Nav;

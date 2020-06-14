import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    
    return (
        <div id="navbar">
            <ul>
            <li><Link to="/welcome">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/mycourses">My Courses</Link></li>
            <li><Link to="/getcourses">Get Courses</Link> </li>
            <li><Link to="/coursecreate">Create a Course</Link></li>
            <li><Link to="/reward">Rewards</Link></li>
            <li><Link to="/" onClick={() => props.setCurrentUser(null)}>Logout</Link> </li>
            </ul>
        </div>
    )
}
  
export default Nav;

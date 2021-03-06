import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return(
            <>
                <div className="user">
                    <center>
                    <p className="font popup top" style={{fontSize:"50px"}}><span>Welcome back </span></p><br></br>
                    <p className="font popup" style={{fontSize:"80px"}}><span>{this.props.currentUser.child_name}</span></p>
                    </center>
                </div>
                <Link to="/mycourses"><img className="image500 greendino" src="./navigation/greendino.png" alt="greendino"/></Link>
                <Link to="/getcourses"><img className="image500 bluedino" src="./navigation/bluedino.png" alt="bluedino"/></Link>
            </>
        )
    }
}

export default Welcome;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return(
            <>
                <div className="user">
                    <p className="font" style={{fontSize:"40px"}}><span>Welcome back {this.props.currentUser.child_name}</span></p>
                    <p></p>
                </div>
                <Link to="/mycourses"><img className="image500 greendino" src="./navigation/greendino.png" alt="greendino"/></Link>
                <Link to="/getcourses"><img className="image500 bluedino" src="./navigation/bluedino.png" alt="bluedino"/></Link>
            </>
        )
    }
}

export default Welcome;
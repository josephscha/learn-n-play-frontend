import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return(
            <>
                <div className="container acenter">
                    <p>Welcome back</p>
                    <p>{this.props.currentUser.child_name}</p>
                </div>
                <Link to="/mycourses"><img className="image500 greendino" src="./navigation/greendino.png" alt="greendino"/></Link>
                <Link to="/getcourses"><img className="image500 bluedino" src="./navigation/bluedino.png" alt="bluedino"/></Link>
            </>
        )
    }
}

export default Welcome;
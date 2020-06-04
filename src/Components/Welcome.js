import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        return(
            <div>
                <p>Welcome back</p>
                <p>{this.props.currentUser.username}</p>
                Navigation icons. 
                1 - MyCourses show page
                2 - GetCourses show page
            </div>
        )
    }
}

export default Welcome;
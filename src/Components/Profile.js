import React, { Component } from 'react';

class Profile extends Component {
    render() {
        return(
            <div>
               <h1>Profile page for {this.props.currentUser.username}</h1>
               
                Courses container
                |
                Completed Courses container
                |
                Userinfo
            </div>
        )
    }
}

export default Profile;
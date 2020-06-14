import React from 'react';

const UserInfo = props => {
    
    // console.log("UserInfo component" , props)
    const {username, email, child_name, score} = props
    return (
        <div className="container acenter">
            <ul style={{fontSize:"30px"}}>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Child's Name: {child_name}</p>
                <p>Current Score: {score}</p>
            </ul>
        </div>
    )
}
  
export default UserInfo;

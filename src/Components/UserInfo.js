import React from 'react';

const UserInfo = props => {
    
    // console.log("UserInfo component" , props)
    const {username, email, child_name, score} = props
    return (
        <div className="profile">
            <div className="kid">
            <img className="kid-pic"src={require("../images/kid.png")}/>
            </div>
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

import React from 'react';
import UserInfo from "./UserInfo"

class Profile extends React.Component {
    
    state = {
        editConfirm: false,
        edit: false,
        username: this.props.currentUser.username,
        password_digest: this.props.currentUser.password_digest,
        password_change: "",
        email: this.props.currentUser.email,
        child_name: this.props.currentUser.child_name
    }


    clickConfirm = () => {
        this.state.password_change === this.state.password_digest ? 
        this.setState({edit: true, password_change: ""}) 
        : 
        alert("Username & Password combination does not match. Please try again.")
        this.setState({editConfirm: false, password_change: ""})
    }

    clickEditConfirm = () => {
        this.setState({editConfirm: true})
    }

    clickRenderEditForm = () => {
        if (this.state.passwordChange !== ""){
        const newUser = {username: this.state.username, 
            password_digest: this.state.password_change, 
            email: this.state.email, 
            child_name: this.state.child_name}
        fetch("http://localhost:3000/users/"+this.props.currentUser.id, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
            }).then(resp => resp.json()).then(json => this.props.setCurrentUser(json))
            .then(this.setState({edit: false, password_change: "", password_digest: newUser.password_digest}))}
            else {this.setState({edit: false, password_change: ""})}
        // fetch patch to backend, and make changes to currentUser as well. 
    }

    changeHandler = (event) => {
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }

    renderEditForm  = () => {
        return (
            <form className="group-form" onChange={event => this.changeHandler(event)}>
                <h1>Edit Form</h1>
                <input type="text" name="username" defaultValue={this.state.username} />
                <input type="password" name="password_change" defaultValue={this.state.password_change} placeholder="New password here"/>
                <input type="text" name="email" defaultValue={this.state.email} />
                <input type="text" name="child_name" defaultValue={this.state.child_name} />
                <button className="s-btn" onClick={this.clickRenderEditForm}>Confirm</button>
            </form>
        )
    }

    renderEditConfirm = () => {
        return (
            <form className="group-form" onChange={event => this.changeHandler(event)}>
                <h1>Confirm your username and password</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" defaultValue={this.state.username} />
                <label htmlFor="password_change">Password:</label>
                <input type="password" name="password_change"/>
                <button className="s-btn" onClick={this.clickConfirm}>Confirm</button>
            </form>
        )
    }

    render() {
        console.log("profile page", this.state)
        return(
            <div>
                <center><h1>{this.props.currentUser.username}'s Profile</h1>
                <div>
                    {this.state.editConfirm || this.state.edit ? null :
                    <UserInfo {...this.props.currentUser}/>}
                    {!this.state.editConfirm && !this.state.edit ? <button className="s-btn" onClick={this.clickEditConfirm}>Edit Profile</button> : null}
                </div>
                    <div>
                        {this.state.editConfirm ? 
                        this.renderEditConfirm() : null }
                        {this.state.edit ? 
                        this.renderEditForm() : null}
                    </div>
                </center>
                <img className="image500 greendino" src="./navigation/polarbear.gif" alt="polarbear"/>
            </div>
        )
    }
}

export default Profile;

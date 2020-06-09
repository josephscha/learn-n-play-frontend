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
        this.setState({edit: true}) 
        : 
        alert("Username & Password combination does not match. Please try again.")
        this.setState({editConfirm: false, password_change: ""})
    }

    clickEditConfirm = () => {
        this.setState({editConfirm: true})
    }

    clickRenderEditForm = () => {
        this.setState({edit: false})
        // fetch patch to backend, and make changes to currentUser as well. 
    }

    changeHandler = (event) => {
        let name = event.target.name
        this.setState({[name]: event.target.value})
    }

    renderEditForm  = () => {
        return (
            <form onChange={event => this.changeHandler(event)}>
                <h1>Edit Form</h1>
                <input type="text" name="username" defaultValue={this.state.username} />
                <input type="password" name="password_change" defaultValue={this.state.password_change} placeholder="New password here"/>
                <input type="text" name="email" defaultValue={this.state.email} />
                <input type="text" name="child_name" defaultValue={this.state.child_name} />
                <button onClick={this.clickRenderEditForm}>Confirm</button>
            </form>
        )
    }

    renderEditConfirm = () => {
        return (
            <form onChange={event => this.changeHandler(event)}>
                <h1>Confirm your username & password</h1>
                <input type="text" name="username" defaultValue={this.state.username} />
                <input type="password" name="password_change" defaultValue={this.state.password_change} />
                <button onClick={this.clickConfirm}>Confirm</button>
            </form>
        )
    }

    render() {
        console.log("profile page", this.state)
        return(
            <div>
                <center><h1>Profile page for {this.props.currentUser.username}</h1>
                <div>
                    <UserInfo {...this.props.currentUser}/>
                    {!this.state.editConfirm && !this.state.edit ? <button onClick={this.clickEditConfirm}>Edit Profile</button> : null}
                </div>
                    <div>
                        {this.state.editConfirm ? 
                        this.renderEditConfirm() : null }
                        {this.state.edit ? 
                        this.renderEditForm() : null}
                    </div>
                </center>
            </div>
        )
    }
}

export default Profile;

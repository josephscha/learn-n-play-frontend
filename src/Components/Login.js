import React, { Component } from 'react';

class Login extends Component {
    state = {
        isNewUser: false,
        username: '',
        password: '',
        email: '',
        childName: ''
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    renderLogin = () => {
        const { username } = this.state;
        return (
            <form>
                <h1 style={{fontSize:"50px"}}>Login</h1>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </form>
        )
    }

    renderSignup = () => {
        const { username,password,email,childName } = this.state;
        return (
            <form>
                <h1 style={{fontSize:"50px"}}>Sign Up</h1>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                <input name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                <input name="email" placeholder="Email" value={email} onChange={this.handleChange}/>
                <input name="childName" placeholder="Child's Name" value={childName} onChange={this.handleChange}/>
                <button onClick={() => this.createUser(username, password, email, childName)}>Submit</button>
            </form> 
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
       let user = this.props.users.find(user => user.username.toLowerCase() === this.state.username.toLowerCase())
       console.log("user object", user)
       if (user) {
        this.props.setCurrentUser(user)
        this.props.history.push('/welcome')
       } else {
            alert("Seems like we cant find you, try creating an account")
            this.setState({
                isNewUser: true,
                username: ''})
           }   
    }

    createUser = (username,password,email,childName) => {
        let newUser = {username: username,  password_digest: password, email: email, child_name: childName, score: 0}
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(user => 
               this.props.setCurrentUser(user))
               this.props.history.push('/welcome')
    }

    render() {
        console.log(this.state)
        let { isNewUser} = this.state
        return (
             <div>
                <h1 >[Icon here] Learn N' Play</h1>
                { isNewUser ? this.renderSignup() : this.renderLogin() }
            </div>
        );
    }
}

export default Login;

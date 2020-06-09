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
        const { username, password } = this.state;
        return (
            <form>
                <h1 style={{fontSize:"50px"}}>Login</h1>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
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
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                <input name="email" placeholder="Email" value={email} onChange={this.handleChange}/>
                <input name="childName" placeholder="Child's Name" value={childName} onChange={this.handleChange}/>
                <button onClick={(e) => this.createUser(e)}>Submit</button>
            </form> 
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
       let user = this.props.users.find(user => user.username.toLowerCase() === this.state.username.toLowerCase())
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

    createUser = (e) => {
        e.preventDefault()
        const newUser = {username: this.state.username,  password_digest: this.state.password, email: this.state.email, child_name: this.state.childName, score: 0}
        
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
            }).then(resp => resp.json()).then(json => this.props.setCurrentUser(json))
    }

    render() {
        let { isNewUser} = this.state
        return (
             <div>
                <h1 className="title">[Icon here] Learn N' Play</h1>
                { isNewUser ? 
                <div className="container acenter">
                {this.renderSignup()} 
                <center><h1>Back to Login</h1><button onClick={() => this.setState({isNewUser: false})}>Back to Login</button>
                
                </center>
                </div>
                : 
                <div className="container acenter">
                {this.renderLogin() }
                <center><h1>New Users</h1><button onClick={() => this.setState({isNewUser: true})}>Click here to Sign-Up</button>
                </center>
                </div>
                }
            </div>
        );
    }
}

export default Login;

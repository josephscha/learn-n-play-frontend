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
            <form  autoComplete="off" className="login-form">
                <h1 className="font"style={{fontSize:"50px"}}>Login</h1>
                <div className="form-control">
                <input autoFocus={true} autoComplete="new-off"  name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                </div>
                <div className="form-control">
                <input autoComplete="new-off"type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                </div>
                <button className="btn" type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </form>
        )
    }

    renderSignup = () => {
        const { username,password,email,childName } = this.state;
        return (
            <form className="signup-form"> 
              <div className="form-control">

                <h1 className ="font"style={{fontSize:"50px"}}>Sign Up</h1>
                <input autoFocus={true} autoComplete="username" name="username" placeholder=" username" value={username} onChange={this.handleChange}/>
                </div>
                <div className="form-control">

                <input autoComplete="off"type="password" name="password" placeholder="password" value={password} onChange={this.handleChange}/>

                </div>
                <div className="form-control">
                <input name="email" placeholder="Email" value={email} onChange={this.handleChange}/>
                </div>
                <div className="form-control">
                <input name="childName" placeholder="Child's Name" value={childName} onChange={this.handleChange}/>
                </div>
                <button className="btn" onClick={(e) => this.createUser(e)}>Submit</button>
            </form> 
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
       let user = this.props.users.find(user => user.username.toLowerCase() === this.state.username.toLowerCase())
       if (user){ 
            if (user.password_digest === this.state.password) {
                this.props.setCurrentUser(user)
                this.props.history.push('/welcome')
            } else {
                    alert("Username & password combination could not be found. Please try again")
                    this.setState({
                        password: ''})
                }   
        } else {
            alert("Could not find User. Please sign up.")
            this.setState({
                isNewUser: true,
                password: ''
            })
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

    changeImage1 = () => {
        const images = ["./navigation/elephant.png", "./navigation/seaotter.png","./navigation/robot.png", "./navigation/piggy.png","./navigation/tiger.png",]
            document.querySelector("#loginimg1").src = images[Math.floor(Math.random() * images.length)];
    }
    changeImage2 = () => {
        const images = ["./navigation/elephant.png", "./navigation/seaotter.png","./navigation/robot.png", "./navigation/piggy.png","./navigation/tiger.png",]
            document.querySelector("#loginimg2").src = images[Math.floor(Math.random() * images.length)];
    }

    render() {
        let { isNewUser} = this.state
        return (
             <div className="loginpage">
                <h1 className="title">Learn N' Play</h1>
                { isNewUser ? 
                <div className="container acenter">
                {this.renderSignup()} 

                <button className="btn2" onClick={() => this.setState({isNewUser: false})}>Back to Login</button>

                </div>
                : 
                <div className="container acenter">
                {this.renderLogin() }

                <button className="btn2" onClick={() => this.setState({isNewUser: true})}>Click here to SignUp</button>

                </div>
                }
                <img src="./navigation/seaotter.png" id="loginimg1" onClick={this.changeImage1}/>
                <img src="./navigation/elephant.png" id="loginimg2" onClick={this.changeImage2}/>
            </div>
        );
    }
}

export default Login;

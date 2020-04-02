import React from "react";
//import config from "./config"

const rootURL = "http://192.168.1.7:8080";  //todo move the rooturl to the config file
 
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: null
        };
    }
    
    login() {
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);

        var url = rootURL + "/login/";
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({username: this.state.email, password: this.state.password})
        })
        .then(resp => resp.text())
        .then((data) => {
            if (data == 'Success') {
                this.props.history.push("/admin");
            } else {
                alert(data); 
            }
        })
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div class="login-form">
                <h2>Login</h2>
                <input type="text" name="username" value={this.state.email} onChange={(e) => {this.handleEmailChange(e)}} placeholder="Username" required />
                <input type="password" name="password" value={this.state.password} onChange={(e) => {this.handlePasswordChange(e)}} placeholder="Password" required />
                <button onClick={() => {this.login()}}>Submit</button>
            </div>
        )
    }
}
 
export default Login;
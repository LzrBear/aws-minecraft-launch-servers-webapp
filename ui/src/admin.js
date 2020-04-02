import React from "react";
//import config from "./config"

const rootURL = "http://192.168.1.7:8080";  //todo move the rooturl to the config file

class WelcomeMsg extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
          data : null
        };
      }

    GetUserName() {
        var url = rootURL + "/GetUser/"
        fetch(url)
        .then(resp => resp.text())
        .then((data) => { this.setState({username: data}) } )
    }

    render() {
        
        if (typeof this.state.username == 'undefined') {
            this.GetUserName();
        }

        return (
            <div>
                <h3>Welcome User { this.state.username }!</h3>
            </div>
        )
    };

}

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: null
        };
    }

    logout() {
        var url = rootURL + "/logout/"
        fetch(url)
        .then(resp => resp.text())
        .then((data) => {
            alert(data);
            if (data == 'Successfully logged out') {
                //this.props.history.push("/"); //todo: determine why this doesn't work
                window.location.href = '/'; //temporary hack because above line does not work
            }
        })
    }

    render() {
        return (
            <div>
                <button onClick={() => {this.logout()}}>Log Out</button>
            </div>
        )
    };
}
 
class Admin extends React.Component {

    render() {
        return (
            <div>
                <WelcomeMsg/>

                
                <button>Create New Server</button>


                <h2>Existing Servers</h2>
                <div>
                        <label>Instance ID:</label>
                        <label>xxx</label>
                        <label>IP Address:</label>
                        <label>xxx.xxx.xxx.xxx</label>
                </div>
                <div>
                    <button>Start</button>
                    <button>Stop</button>
                    <button>Delete</button>
                </div>

                <br/>
                <Logout/>
            </div>
        )
    }
}
 
export default Admin;
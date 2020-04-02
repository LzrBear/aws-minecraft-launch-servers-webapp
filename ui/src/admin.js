import React from "react";
//import config from "./config"

const rootURL = "http://192.168.1.7:8080";  //todo move the rooturl to the config file

class GetInstance extends React.Component {

    GetInstance(InstanceID) {
        var url = rootURL + "/Get/InstanceID/" + InstanceID
        fetch(url)
        .then(resp => resp.text())
        .then((data) => {alert(data)} )
    }

    render() {
        return <button onClick={() => {this.GetInstance("i-0c52c07979a3a8904")}}>Get Instance Details</button>
    }
}

class CreateServer extends React.Component {

    CreateServer() {
        var url = rootURL + "/CreateServer/"
        fetch(url)
        .then(resp => resp.text())
        .then((data) => { 
            //alert(data); 
            window.location.reload(); 
        });
    }

    render() {
        return <button onClick={() => {this.CreateServer()}}>Create New Server</button>
    }
}

class WelcomeMsg extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
          data : null
        };
      }

    getUserName() {
        var url = rootURL + "/GetUser/"
        fetch(url)
        .then(resp => resp.text())
        .then((data) => { this.setState({username: data}) } )
    }

    render() {
        
        if (typeof this.state.username == 'undefined') {
            this.getUserName();
        }

        return (
            <div>
                <h3>Welcome { this.state.username }</h3>
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
            //alert(data);
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

class ListInstances extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: []
        };
    }

    getInstances() {
        var url = rootURL + "/GetInstances"
        fetch(url)
        .then(resp => resp.json())
        .then((data) => {
            this.setState({instances: data});
        })
    }

    startServer(instanceID) {
        var url = rootURL + "/Start/InstanceID/" + instanceID
        fetch(url)
        .then(resp => resp.text())
        .then((data) => { 
            alert(data); 
            window.location.reload(); 
        });
    }

    stopServer(instanceID) {
        var url = rootURL + "/Stop/InstanceID/" + instanceID
        fetch(url)
        .then(resp => resp.text())
        .then((data) => { 
            alert(data); 
            window.location.reload(); 
        });
    }

    deleteServer(instanceID) {
        var url = rootURL + "/Delete/InstanceID/" + instanceID
        fetch(url)
        .then(resp => resp.text())
        .then((data) => { 
            alert(data); 
            window.location.reload(); 
        });
    }

    render() {
        if (typeof this.state.instances == 'undefined') {
            this.getInstances();
        } else {
            var instanceList = this.state.instances.map((instance) => {
                return (
                    <tr>
                        <td>{instance.ID}</td>
                        <td>{instance.IPAddr}</td>
                        <td>{instance.State}</td>
                        <td>
                            <button onClick={() => {this.startServer(instance.ID)}}>Start</button>
                            <button onClick={() => {this.stopServer(instance.ID)}}>Stop</button>
                            <button onClick={() => {this.deleteServer(instance.ID)}}>Delete</button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <table>
                    <tr>
                        <th>Server ID</th>
                        <th>IP Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    { instanceList }
                </table>
            </div>
        )
    };
}
 
class Admin extends React.Component {

    render() {
        return (
            <div>
                <WelcomeMsg/>               
                <Logout/>
                <h2>Servers</h2>
                <CreateServer/>
                <ListInstances/>               
            </div>
        )
    }
}
 
export default Admin;
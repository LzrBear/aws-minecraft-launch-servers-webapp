import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from "./home";
import Stuff from "./stuff";
import Contact from "./contact";
import Login from "./login";
import Admin from "./admin";

const rootURL = "http://192.168.1.7:8080"; //"http://localhost:8080";  //

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

class CreateInstance extends React.Component {

    CreateInstance() {
        var url = rootURL + "/Create/"
        fetch(url)
        .then(resp => resp.text())
        .then((data) => {alert(data)} )
    }

    render() {
        return <button onClick={() => {this.CreateInstance()}}>Create New Instance</button>
    }
}

class WelcomeMsg extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
          data : null
        };
      }

    // async GetUserName() {
    //     var url = rootURL + "/GetUser/"
    //     var resp = await fetch(url);
    //     var data = await resp.text();
    //     return data;
    // }

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

    logout() {
        var url = rootURL + "/logout/"
        fetch(url)
        .then(resp => resp.text())
        .then((data) => {alert(data)} )
    }

    render() {
        return (
            <div>
                <button onClick={() => {this.logout()}}>Log Out</button>
            </div>
        )
    };
}

// class Login extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { 
//             value: null
//         };
//     }
    
//     login() {
//         console.log("Email: " + this.state.email);
//         console.log("Password: " + this.state.password);

//         var url = rootURL + "/login/"
//         fetch(url, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             body: JSON.stringify({username: this.state.email, password: this.state.password})
//         })
//         .then(resp => resp.text())
//         .then((data) => {alert(data)} )
//     }

//     handleEmailChange(e) {
//         this.setState({email: e.target.value});
//     }

//     handlePasswordChange(e) {
//         this.setState({password: e.target.value});
//     }

//     render() {
//         return (
//             <div class="login-form">
//                 <h2>Login Form</h2>
//                 <input type="text" name="username" value={this.state.email} onChange={(e) => {this.handleEmailChange(e)}} placeholder="Username" required />
//                 <input type="password" name="password" value={this.state.password} onChange={(e) => {this.handlePasswordChange(e)}} placeholder="Password" required />
//                 <button onClick={() => {this.login()}}>Submit</button>
//             </div>
//         )
//     }
// }

class MineCraftAdminConsole extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <h1>Manage MineCraft Servers</h1>

                    <div className="content">
                        <Route exact path="/" component={Login}/>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/contact" component={Contact}/>
                    </div>
                </HashRouter>
            </div>
        )
    }
}



class SPA extends React.Component{
    
    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <h1>Simple SPA</h1>
                        <ul className="header">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/stuff">Stuff</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                        <div className="content">
                            <Route exact path="/" component={Home}/>
                            <Route path="/stuff" component={Stuff}/>
                            <Route path="/contact" component={Contact}/>
                        </div>
                    </div>
                </HashRouter>
            </div>
        )
    }
}
  
class Main extends React.Component {

    render() {
        return (
            <div>
                <h1>Manage MineCraft Servers</h1>

                {/* <Login /> */}

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
                </div>

                <br/>
                <Logout/>


                <br/>
                <br/>
                <br/>

                <SPA/>


            </div>
        )
    }
}

  // =======================================
  
  ReactDOM.render(
    <MineCraftAdminConsole />,
    document.getElementById('root')
  );



  /// Tutorial Code =============================

  // class Square extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             value: null
//         };
//     }


//     render() {
//       return (
//         <button className="square" onClick={() => { this.setState({value: 'X'}) }}>
//           {this.state.value}
//         </button>
//       );
//     }
//   }
  
//   class Board extends React.Component {
//     renderSquare(i) {
//       return <Square value={i}/>;
//     }
  
//     render() {
//       const status = 'Next player: X';
  
//       return (
//         <div>
//           <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }
  
//   class Game extends React.Component {
//     render() {
//       return (
//         <div className="game">
//           <div className="game-board">
//             <Board />
//           </div>
//           <div className="game-info">
//             <div>{/* status */}</div>
//             <ol>{/* TODO */}</ol>
//           </div>
//         </div>
//       );
//     }
//   }

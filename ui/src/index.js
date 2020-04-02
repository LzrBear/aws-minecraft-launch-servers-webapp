import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    HashRouter
} from "react-router-dom";
import Login from "./login";
import Admin from "./admin";
import './index.css';

class MineCraftAdminConsole extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <h1>Manage Minecraft Servers</h1>
                    <div className="content">
                        <Route exact path="/" component={Login}/>
                        <Route path="/admin" component={Admin}/>
                    </div>
                </HashRouter>
            </div>
        )
    }
}

// =======================================
  
ReactDOM.render(
    <MineCraftAdminConsole />,
    document.getElementById('root')
);

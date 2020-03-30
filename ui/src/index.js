import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const rootURL = "http://localhost:8080";  //"http://192.168.1.7:8080";

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

class MineCraftAdminConsole extends React.Component {
    render() {
        return (
            <div>
                <p>MineCraft Server</p>
                <CreateInstance />
                <br/>
                <GetInstance />
            </div>
        )
    }
}
  
  // ========================================
  
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

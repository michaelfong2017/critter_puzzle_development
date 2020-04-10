import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import img_up from './Image/up.png';
import img_hole from './Image/hole.png';
import img_generate from './Image/generate.png';
import img_revert from './Image/revert.png';
import img_next from './Image/next.png';

function Grid(props) {
  var img;
  if (props.value === 1) {
    img = img_up;
  }
  else if (props.value === 0) {
    img = img_hole;
  }
  else {
    img = img_hole;
  }
  return (
    <button className="grid" onClick={props.onClick}>
      <img className="img" src={img} alt=""/>
    </button>
  );
}

class Board extends React.Component {
  renderGrid(i, j, key_j) {
    return (
      <Grid key={key_j}
        value={this.props.grids[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  render() {
    const grids = new Array(this.props.dimension);
    for (let i=0;i<this.props.dimension;i++) {
      grids[i] = new Array(this.props.dimension).fill(null);
    }
    const gridsUI = grids.map((row, i) => {
      return (
        <div key={i} className="board-row">
          {row.map((grid, j) => {
            return (
              this.renderGrid(i, j, j)
            )
          })}
        </div>
      );
    });

    return (
      <div>
        {gridsUI}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    var dimension = 4;
    const grids = new Array(dimension);
    for (let i=0;i<dimension;i++)
      grids[i] = new Array(dimension).fill(null);
    const current = {
      grids: grids,
      legal_actions: [],
      stepNumber: 0,
    };
    const new_current = RandomGenerate(current, dimension);

    this.state = {
      dimension: dimension,

      history: [new_current],
      historyNumber: 0,
    };
  }
  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.historyNumber + 1);
    const current = history[history.length - 1];
    const grids = current.grids.slice();
    if (IsWin(grids, this.state.dimension) || grids[i][j]!==1) {
      return;
    }
    const new_current = OnDoAction(current, i, j);

    this.setState({
      history: history.concat([new_current]),
      historyNumber: history.length,
    });
    return
  }

  jumpTo(move) {
    this.setState({
      historyNumber: move,
    });
  }

  getCurrent() {
    return this.state.history[this.state.history.length-1];
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.historyNumber];
    const win = IsWin(current.grids, this.state.dimension);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to history #' + move : 
        'Go to game start';
      return (
        <li key={move}>
          <button style={{
            fontSize: "15px",
            width: "100%",
            border: HighlightHistory(this.state.historyNumber, move)}} id="history" onClick={() => {
          this.jumpTo(move);
          }}>{desc}</button>
        </li>
      )
    })

    let status_step, status_history;
    if (win) {
      status_step = 'Win! Step used: ' + this.state.history[this.state.historyNumber].stepNumber;
    }
    else {
      status_step = 'Steps used: ' + this.state.history[this.state.historyNumber].stepNumber;
    }
    status_history = 'Now at history #' + this.state.historyNumber;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            grids={current.grids}
            onClick={(i, j) => this.handleClick(i, j)}
            dimension = {this.state.dimension}
          />
        </div>
        <div className="game-control">
          <button className="grid" onClick={() => {
            const history = this.state.history.slice(0, this.state.historyNumber + 1);
            const current = history[history.length-1];
            const new_current = RandomGenerate(current);
            this.setState({
             history: history.concat(new_current),
             historyNumber: history.length,
            })
          }}>
            <img className="img" src={img_generate} alt=""/>
          </button>
          <button className="grid" onClick={() => {this.jumpTo(this.state.historyNumber===0?0:this.state.historyNumber-1)}}>
            <img className="img" src={img_revert} alt=""/>
          </button>
          <button className="grid" onClick={() => {this.jumpTo(this.state.historyNumber===this.state.history.length-1?this.state.historyNumber:this.state.historyNumber+1)}}>
            <img className="img" src={img_next} alt=""/>
          </button>
          
        </div>
        <div className="game-info">
          <div className="status">{status_step}</div>
          <div className="status">{status_history}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function HighlightHistory(historyNumber, move) {
  if (historyNumber === move) {
    return '4px solid #8c8b4b'
  }
}

function DeepCopyCurrent(current) {
  const g = current.grids.map((row) => {
    return row.slice();
  });
  const l = current.legal_actions.slice();
  const new_current = {
    grids: g,
    legal_actions: l,
    stepNumber: current.stepNumber,
  };
  return new_current;
}

function IsWin(grids, dimension) {
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (grids[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
}

/*function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}*/

function RandomGenerate(current) {

  var new_current = DeepCopyCurrent(current);
  
  const grids = new_current.grids;
  var legal_actions = new_current.legal_actions;
  for (let i=0;i<grids.length;i++) {
    for (let j=0;j<grids.length;j++) {
      const r = Math.random();
      if (r < 0.5) {
        grids[i][j] = 1;
        legal_actions.push([i, j]);
      }
      else {
        grids[i][j] = 0;
      }
    }
  }
  new_current.stepNumber = 0;

  return new_current;
}

function OnDoAction(current, row, column) {
  const dimension = current.grids.length;
  const new_current = DeepCopyCurrent(current);
  const grids = new_current.grids;
  var legal_actions = new_current.legal_actions;

  grids[row][column] = 0

  if (row-1 !== -1) {
    if (grids[row-1][column] === 1) {
      grids[row-1][column] = 0;
      legal_actions = legal_actions.filter((item) => item[0]===row-1 && item[1]===column);
    }
    else {
      grids[row-1][column] = 1;
      legal_actions.push([row-1, column]);
    }
  }
  if (column+1 !== dimension) {
    if (grids[row][column+1] === 1) {
      grids[row][column+1] = 0;
      legal_actions = legal_actions.filter((item) => item[0]===row && item[1]===column+1);
    }
    else {
      grids[row][column+1] = 1;
      legal_actions.push([row, column+1]);
    }
  }
  if (row+1 !== dimension) {
    if (grids[row+1][column] === 1) {
      grids[row+1][column] = 0;
      legal_actions = legal_actions.filter((item) => item[0]===row+1 && item[1]===column);
    }
    else {
      grids[row+1][column] = 1;
      legal_actions.push([row+1, column]);
    }
  }
  if (column-1 !== -1) {
    if (grids[row][column-1] === 1) {
      grids[row][column-1] = 0;
      legal_actions = legal_actions.filter((item) => item[0]===row && item[1]===column-1);
    }
    else {
      grids[row][column-1] = 1;
      legal_actions.push([row, column-1]);
    }
  }
  new_current.stepNumber = new_current.stepNumber + 1;
 
  return new_current;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


import React, { Component } from 'react';
import Row from './Row';

function getInitialState() {
  return {
    rows: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    turn: 'X',
    winner: undefined,
  };
}

function checkWin(rows) {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const flattened = rows.reduce((acc, row) => acc.concat(row), []);

  return combos.find(combo => (
    flattened[combo[0]] !== '' &&
    flattened[combo[0]] === flattened[combo[1]] &&
    flattened[combo[1]] === flattened[combo[2]]
  ));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = getInitialState();
  }

  handleClick(row, square) {
    let { turn, winner } = this.state;
    const { rows } = this.state;
    const squareInQuestion = rows[row][square];

    if (this.state.winner) return;
    if (squareInQuestion) return;

    rows[row][square] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    winner = checkWin(rows);

    this.setState({
      rows,
      turn,
      winner,
    });
  }

  handleReset() {
    this.setState(getInitialState());
  }

  render() {
    const { rows, turn, winner } = this.state;
    const handleClick = this.handleClick;
    const rowElements = rows.map((letters, i) => (
      <Row key={i} row={i} letters={letters} handleClick={handleClick} />
    ));
    const moves = rows.reduce((acc, row) => acc.concat(row), []).join('').length;

    let infoDiv;
    if (winner) {
      let winTurn = turn === 'X' ? 'O' : 'X';
      infoDiv = (
        <div>
          <div id='winString'>Player {winTurn} wins with squares {winner.join(', ')}!</div>
        </div>
      );
    } else if (moves === 9) {
      infoDiv = <div>Draw!</div>;
    } else {
      infoDiv = <div>Turn: {turn}</div>;
    }

    return (
      <div>
        Care Revolutions Tic-Tac-Toe
        {infoDiv}
        <div id="board">
          {rowElements}
        </div>
        <button id="clear" onClick={() => {this.handleReset()}}>Clear</button>
      </div>
    );
  }
}

export default App;

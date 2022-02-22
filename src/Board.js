import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    // this.flipCellsAround = this.flipCellsAround.bind(this)
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let x = 0; x < this.props.nRows; x++) {
      let rows = [];
      for (let y = 0; y < this.props.nCols; y++) {
        let light = Math.random() < this.props.chanceLightStartsOn;
        rows.push(light)
      }
      board.push(rows)
    }

    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { nCols, nRows } = this.props;
    let board = this.state.board;
    // setting hasWon check
    let hasWon = this.state.hasWon;
    let [y, x] = coord.split("-").map(Number);

    console.log(coord);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    // TODO: flip this cell and the cells around it
    // setState of board with the changes
    const checkStat = (currentValue) => currentValue === false;
    hasWon = board.flat().every(checkStat);
    this.setState({ board, hasWon });
    // win when every cell is turned off
    // TODO: determine if the game has been won
  }


  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return (
        <div className='Board-title'>
          <div className="winner">
            <span className="neon-orange">You</span>
            <span className="neon-blue ">Win</span>
          </div>
        </div>
      )
    }
    // TODO
    // make table board
    let tblBoard = [];
    for (let x = 0; x < this.props.nRows; x++) {
      let row = [];
      for (let y = 0; y < this.props.nCols; y++) {
        let coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            coord={coord}
            isLit={this.state.board[x][y]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={x}>{row}</tr>)
    };

    return (
      <div>
        <div className='Board-title'>
          <div className="neon-orange">Lights</div>
          <div className="neon-blue ">Out</div>
        </div>

        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    )

    // TODO
  }
}


export default Board;

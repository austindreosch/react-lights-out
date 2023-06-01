import React, { useState } from "react";
import "./Board.css";
import Cell from "./Cell";

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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    for (let row = 0; row < nrows; row++) {
      let newRow = [];
      for (let col = 0; col < ncols; col++) {
        newRow.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(newRow);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    for (let row = 0; row < nrows; row++) {
      for (let col = 0; col < ncols; col++) {
        // If any cell is still lit, the game is not won
        if (board[row][col] === true) {
          return false;
        }
      }
    }
    // If all cells are unlit, the game is won
    return true;



  }

function flipCellsAroundMe(coord) {
  setBoard(oldBoard => {
    const [y, x] = coord.split("-").map(Number);

    const flipCell = (y, x, boardCopy) => {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };

    // TODO: Make a (deep) copy of the oldBoard
    let boardCopy = [];
    for (let row = 0; row < oldBoard.length; row++) {
      const rowCopy = [...oldBoard[row]];
      boardCopy.push(rowCopy);
    }

    // TODO: in the copy, flip this cell and the cells around it
    flipCell(y, x, boardCopy);
    flipCell(y - 1, x, boardCopy);
    flipCell(y + 1, x, boardCopy);
    flipCell(y, x - 1, boardCopy);
    flipCell(y, x + 1, boardCopy);

    // TODO: return the copy
    return boardCopy;
  });
}

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You won!</div>;
  }
  // TODO

  // make table board
return (
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  flipCellsAroundMe={() => flipCellsAroundMe(`${rowIndex}-${colIndex}`)}
                  isLit={cell}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );

}

export default Board;

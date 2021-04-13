const chalk = require("chalk");

let chessBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const isCompleted = () => {
  let i = 0;
  chessBoard.forEach((row) => {
    row.forEach((col) => {
      if (col == 1) {
        i++;
      }
    });
  });
  if (i == 4) {
    return true;
  }
  return false;
};
const DFS = (col) => {
  let jj = 0;
  if (isCompleted()) {
    printChessBoard();
    return;
  }
  for (let i = 0; i < 4; i++) {
    if (isSafePlace(i, col)) {
      chessBoard[i][col] = 1;
      DFS(col + 1);
      if (isCompleted()) {
        //console.log("completeee");
        jj++;
        console.log(jj);
        break;
      } else {
        chessBoard[i][col] = 0;
      }
      //printChessBoard();
    }
  }
  //console.log(boardID);
  return;
};

//simple 2D array comparison function

const putQueen = (row, col) => {
  //safe place?
  const safe = isSafePlace(row, col);
  if (safe) {
    chessBoard[row][col] = 1; //assign the queen
    printChessBoard();
  } else {
    console.log(chalk.white.bgRed("Not valid (Attacking Place)"));
  }
};

/*
!=========================================================================================! 
*/

const isSafePlace = (row, col) => {
  //?ensure that the row has no 1's
  if (chessBoard[row].indexOf(1) != -1) {
    return false;
  }
  //?ensure that the col has no 1's
  for (let i = 0; i < 4; i++) {
    if (chessBoard[i][col] == 1) {
      return false;
    }
  }
  //?ensure that the diagonals are safe
  const DiagonalsSafe = AreDiagonalsSafe(row, col);
  //console.log(DiagonalsSafe);
  return DiagonalsSafe;
};

//*check diagonals of the coming queen have no 1's (the coming queen's diagonals only)
const AreDiagonalsSafe = (row, col) => {
  /**
   *
   *!  | T | 0 | T | 0 |
   *?  | 0 | 1 | 0 | 0 |
   *!  | T | 0 | T | 0 |
   *!  | 0 | 0 | 0 | T |
   *
   */
  let step = 1; //* to calculate the next col of the diagonal
  // above diagonals
  //* go to the above rows
  for (let i = row - 1; i >= 0; i--) {
    //* move to left diagonal until it reaches 0 (The Edge)
    if (col - step >= 0) {
      //? is there 1 in it?
      if (chessBoard[i][col - step] == 1) {
        return false;
      }
    }
    //* move to right diagonal until it reaches 4 (The Edge)
    if (col + step < 4) {
      //? is there 1 in it?
      if (chessBoard[i][col + step] == 1) {
        return false;
      }
    }

    step++;
  }

  //bottom diagonals
  step = 1;
  //* go to the bottom rows
  for (let i = row + 1; i < 4; i++) {
    //* move to left diagonal until it reaches 0 (The Edge)
    if (col - step >= 0) {
      //? is there 1 in it?
      if (chessBoard[i][col - step] == 1) {
        return false;
      }
    }
    //* move to right diagonal until it reaches 4 (The Edge)
    if (col + step < 4) {
      //? is there 1 in it?
      if (chessBoard[i][col + step] == 1) {
        return false;
      }
    }
    step++;
  }
  return true;
};

const printChessBoard = () => {
  chessBoard.forEach((row) => {
    let printRow = "| ";
    row.forEach((col) => {
      if (col == 1) {
        printRow = printRow + chalk.green(col) + " | ";
      } else {
        printRow = printRow + chalk.grey(col) + " | ";
      }
    });
    console.log(printRow);
  });
  console.log("=================");
};

const compareArray2D = (arr1, arr2) => {
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] != arr2[i][j]) {
        return false;
      }
    }
  }
  return true;
};

//ensure the board haven't been implemented before
const isRepeadedBoard = (board) => {
  let repeated = false;
  searchHistoryBoard.forEach((elemnet) => {
    if (compareArray2D(elemnet.board, board)) {
      repeated = true;
      return;
    }
  });
  return repeated;
};

//putQueen(3, 2);

DFS(0);

//printChessBoard();

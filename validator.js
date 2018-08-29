const Boards = require ('./sudoku-board');

/*Check whether each row, column and sub-grid contains 1-9*/

function validateEntry(data) {
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
    let dif = [1,2,3,4,5,6,7,8,9].diff(data);
    if (dif && dif.length) {
        return false;
    } else {
        return true
    }
}

/* Apply check on each column of sudoku board*/

getColumns = (board) => {
    let isValid = true;
    for(let i = 0; i< 9; i++) {
        let col = [];
        for(let j = 0;j<9; j++) {
            col.push(board[j][i]);
        }
        isValid = validateEntry(col);
        if (!isValid) {
            break;
        }
    }
    return isValid;
}

/* Apply check on each row of sudoku board */
getRows = (board) => {
    let isValid = true;
    for(let i = 0; i< 9; i++) {
        isValid = validateEntry(board[i]);
        if (!isValid) {
            break;
        }
    }
    return isValid;
}

/* Divide Sudoku board into sub-grids */
getGrids = (board) => {
    let isValid = true;
    let boardIndices = [0,3,6];

    // cut into sub-grids

    for(let i of boardIndices) {
        for(let j of boardIndices) {
            isValid = validateGrid(board,i,j);
            if (isValid === false) {
                break;
            }
        }
    }
    return isValid;

}

validateGrid = (board,index1,index2) => {
    let gridData = [];
    let grid_board =[];
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j< 3; j++) {
            grid_board.push(board[index1+i][index2+j])
        }
    }
    gridData = gridData.concat(grid_board);
    return validateEntry(gridData);
}

validateSudoku = (board) => {
    const cols = getColumns(board);
    const rows = getRows(board);
    const grids = getGrids(board);
    if(cols && rows && grids) {
        console.log('valid')
    }else{
        console.log('invalid')
    }
}

const validBoard = [
    [3,7,9,2,4,5,8,6,1],
    [2,8,5,3,6,1,9,7,4],
    [1,6,4,9,7,8,2,3,5],
    [9,5,8,6,3,4,1,2,7],
    [4,3,7,1,9,2,6,5,8],
    [6,2,1,8,5,7,4,9,3],
    [7,9,2,4,1,3,5,8,6],
    [8,4,3,5,2,6,7,1,9],
    [5,1,6,7,8,9,3,4,2]
];

validateSudoku(validBoard);
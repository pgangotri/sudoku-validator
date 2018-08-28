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

function getColumns(board) {
    let isValid = true;
    for(let i = 0; i< 9; i++) {
        let col = [];
        for(let j = 0;j<9; j++) {
            col.push(board[j][i]);
        }
        isValid = validateEntry(col);
        if (!isValid) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

/* Apply check on each row of sudoku board */
function getRows(board) {
    let isValid = true;
    for(let i = 0; i< 9; i++) {
        isValid = validateEntry(board[i]);
        if (!isValid) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

/* Divide Sudoku board into sub-grids */
function getGrids(board) {
    let isValid = true;
    let boardIndices = [0,3,6];

    // cut into sub-grids

    for(let i of boardIndices) {
        for(let j of boardIndices){
            let validator = validateGrid(board,i,j);
            if (validator === false) {
                isValid = false;
                break;
            }
        }
    }
    return isValid;

}

function validateGrid(board,index1,index2) {
    let gridData = [];
    let grid_board =[];
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j< 3; j++){
            grid_board.push(board[index1+i][index2+j])
        }
    }
    gridData=gridData.concat(grid_board);
    return validateEntry(gridData);
}

function validateSudoku(board) {
    const cols = getColumns(board);
    const rows = getRows(board);
    const grids = getGrids(board);
    if(cols && rows && grids) {
        console.log('valid')
    }else{
        console.log('invalid')
    }
}

validateSudoku(Boards.validBoard);
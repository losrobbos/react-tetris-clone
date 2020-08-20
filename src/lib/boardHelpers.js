export const createMatrix = (rows, cols, objDefault = {}) => {
  let matrix = Array(rows).fill('')
  return matrix.map((row, r) => {
    return Array(cols).fill('').map((col, c) => ({...objDefault, row: r, col: c}))
  })
}

/**
 * Remove shape from board by just resetting color of all fields to board color
 */
export const clearShapeCurrentFromBoard = (shape, board, baseColor) => {

  let shapeFields = shape.shape
  let position = shape.position

  shapeFields.forEach((rowItem, r) => rowItem.forEach((field, c) => {
    // reset color on current pos
    if(field) {
      let rowOld = r + position.row
      let colOld = c + position.col 
      board[rowOld][colOld].color = baseColor
    }
  }))
}

/**
 * print shape to board by coloring the shape fields on the board
 */
export const flushShapeToBoard = (shape, board) => {

  let shapeFields = shape.shape
  let positionNew = shape.position

  // place shape at NEW POS on board
  shapeFields.forEach((rowItem, r) => rowItem.forEach((field, c) => {
    if(field) {
      let rowNew = r + positionNew.row
      let colNew = c + positionNew.col
      board[rowNew][colNew].color = shape.color
    }
  }))

  return shape
}

/**
 * Mark all fields of given shape "fixed" on the corresponding board field
 * => this way we tell: This field cannot move anymore
 */
export const fixShapeOnBoard = (shape, board) => {

  let shapeFields = shape.shape
  let position = shape.position

  shapeFields.forEach((rowItem, r) => rowItem.forEach((field, c) => {
    if(field) {
      board[position.row+r][position.col+c].fixed = true
    }
  }))

}

/**
 * Check if shape at this pos is out of bounds or has overlap with a fixed cell
 * 
 * - check all shape fields 
 *  - is it on negative row?
 *  - is it on negative col?
 *  - is it on row >= board rows count?
 *  - is it on col >= board rows count?
 *  - is it on a fixed field?
 * => in each case: Mark shape as collided
 * 
 */
export const hasShapeCollided = (shape, board, config) => {

  let arrShape = shape.shape
  let position = shape.position

  // loop through fields and check if for each field if it is placed on fixed field on board
  // if so: the shape has collided
  for(let r=0; r<arrShape.length; r++) {
    for(let c=0; c<arrShape[r].length; c++) {
      if(!arrShape[r][c]) {
        continue;
      }
      let fieldRow = r+position.row
      let fieldCol = c+position.col

      // out of bounds?
      if(fieldRow < 0) { return true}
      if(fieldCol < 0) { return true}
      if(fieldRow >= config.rows) { return true }
      if(fieldCol >= config.cols) { return true }
      // collided with another shape?
      if(board[fieldRow][fieldCol].fixed) { return true }
    }
  }

  return false
}


/**
 * Get all FILLED rows (so rows completely covered with shape fields)
 */
export const getRowsFilled = (board, config) => {

  let { rows, cols } = config
  let rowsFilled = []

  // determine all rows where all columns have the "fixed" attribute
  for(let r=0; r<rows; r++) {
    let colsFilled = 0
    for(let c=0; c<cols; c++) {
      colsFilled += (board[r][c].fixed ? 1 : 0)
    }
    if(colsFilled == cols) {
      rowsFilled.push(r)
    }
  }

  return rowsFilled
}

/**
 * Clear given rows by 
 */
export const clearRows = (board, rowsToClear, config) => {

  // for every row to clear => grab all rows above that row
  // move / copy each row above one row down
  for(let i=0; i<rowsToClear.length; i++) {
    let rowLowest = rowsToClear[i]-1
    for(let r=rowLowest; r>=0; r--) {
      moveRowDown(board, r)
    }
  }
}

/**  
 * Move down all fields of that row to the NEXT row
 * (just by copying the fields)
 */
const moveRowDown = (board, rowIndex, stepSize = 1) => {

  // move every single columns object one column down
  board[rowIndex].forEach((col, c) => {
    board[rowIndex+1][c] = {...col, row: rowIndex+1, col: c}
  })

}
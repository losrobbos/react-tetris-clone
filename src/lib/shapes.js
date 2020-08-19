const shapes = {
  square: {
    shape: [
      [ '1', '1' ],
      [ '1', '1' ] 
    ],
    color: 'darkblue'
  },
  line: {
    shape: [
      ['1'],
      ['1'],
      ['1']
    ],
    color: 'red'
  },
  zet: {
    shape: [
      [ '1', '1', '' ],
      [ '', '1', '1' ] 
    ],
    color: 'green'
  },
  l: {
    shape: [
      [ '1', '', ''],
      [ '1', '1', '1']
    ],
    color: 'purple'
  }
}

// flip clockwise by exchanging rows & columns of array
export const rotateShape = (shape) => {

  let shapeCopy = {...shape}
  let arrShape = [...shapeCopy.shape]

  let arrRotated = Array(arrShape[0].length).fill('')
  arrRotated = arrRotated.map(row => Array(arrShape.length))
  
  // loop through COLS => and create new ROWs from them
  arrShape[0].forEach((col, c) => {
    // create COLUMN by going through each row and grab val at pos c
    arrShape.forEach((row, r) => {
      arrRotated[c][r] = arrShape[r][c]
    })
    arrRotated[c].reverse()
  })

  shapeCopy.shape = arrRotated
  shapeCopy.dimensions = getShapeDimensions(shapeCopy)
  
  return shapeCopy
}


// get amount of rows / cols that the shape spans on the board
export const getShapeDimensions = (shape) => {
  return { rows: shape.shape.length, cols: shape.shape[0].length }
}

export const getRandomShape = () => {
  let arrShapes = Object.keys(shapes)
  let randomKey = Math.floor( Math.random() * arrShapes.length)
  let shapeName = arrShapes[randomKey]
  return shapes[shapeName]
}


export default shapes
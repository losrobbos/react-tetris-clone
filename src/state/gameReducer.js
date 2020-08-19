import { createMatrix, hasShapeHitBounds, flushShapeToBoard, 
  clearShapeCurrentFromBoard, hasShapeCollided, fixShapeOnBoard, getRowsFilled, clearRows } from '../lib/boardHelpers';
import * as actions from './actions';
import { getRandomShape, getShapeDimensions, rotateShape } from '../lib/shapes';

export const gameStates = { notstarted: 'notstarted', running: 'running', paused: 'paused', won: 'won', lost: 'list' }

export const keys = { up: 'up', down: 'down', left: 'left', right: 'right' }
 
export const initialState = {
  board: [],
  shapes: [],
  config: { rows: 12, cols: 6, moveIntervalInSeconds: 1, baseColor: 'orange' },
  gameState: gameStates.running,
  score: 0
}


const gameReducer = (state, action) => {

  console.log("Action received: ", action)

  let { board, shape, config, score } = state
  let gameState
  let collided = false
  let directionNew
  let dimensions

  switch(action.type) {

    // create board matrix
    case actions.INIT_BOARD:
      board = createMatrix(state.config.rows, state.config.cols, { 
        color: state.config.baseColor,
        fixed: false
      })
      shape = null
      gameState = gameStates.running
      return { ...state, board, shape, gameState, score: 0 };

    // init new / move existing shape on the board

    case actions.INIT_SHAPE:
      
      // create new random shape and place it on board 
      shape = getRandomShape()

      // calculate dimensions
      shape.dimensions = getShapeDimensions(shape)
      shape.position = { row: 0, col: 2 } // give shape initial position

      // check if new shape collides with existing fields => GAME OVER
      collided = hasShapeCollided(shape, board, config)

      shape = flushShapeToBoard(shape, board)

      gameState = state.gameState
      if(collided) {
        gameState = gameStates.lost
        shape = null
      }
      return { ...state, shape, board, gameState }


    case actions.MOVE_SHAPE:

      // no shape = no move
      if(!shape) {
        return state
      }

      directionNew = action.payload
      dimensions = shape.dimensions
      let shapeCopy = {...shape, shape: [...shape.shape], position: {...shape.position}}

      // prepare move of shape in direction
      switch(directionNew) {

        case 'left':
          shapeCopy.position.col--
          // prevent moving into other shape or out of board bounds
          if(hasShapeHitBounds(shapeCopy, config) || hasShapeCollided(shapeCopy, board, config)) {
            return state 
          }
          break;


        case 'right':
          shapeCopy.position.col++
          // prevent moving into other shape or out of board bounds
          if(hasShapeHitBounds(shapeCopy, config) || hasShapeCollided(shapeCopy, board, config)) {
            return state 
          }
          break;


          // special case up => rotate shape!
          // rotate & recalculate shape (switch array rows & cols)
        case 'up':

          shapeCopy = rotateShape(shapeCopy)
          if(hasShapeHitBounds(shapeCopy, config) || hasShapeCollided(shapeCopy, board, config)) {
            return state 
          }
          break;


        case 'down':

          // just allow down move on initialized board & shape
          if(!board || !shape) {
            return state
          }

          shapeCopy.position.row++

          // check for colission with ground or other shape
          collided = (hasShapeHitBounds(shapeCopy, config) || hasShapeCollided(shapeCopy, board, config))

          // if collided => fix shape on board and return (do not perform down move)
          if(collided) {
            fixShapeOnBoard(shape, board)
            shape = null

            // rows filled?
            let rowsFilled = getRowsFilled(board, config)
            
            // rows filled? clear rows and move all board rows above down!
            if(rowsFilled.length > 0) {
              clearRows(board, rowsFilled, config)
              score += rowsFilled.length
            }

            return { ...state, shape, board, score }
          }
          break;

        default:
          return state
      }

      // at that point: shape move is granted - draw new shape position to board  

        // clear old shape from board
      clearShapeCurrentFromBoard(shape, board, state.config.baseColor)

        // flush new shape to board
      shape = flushShapeToBoard(shapeCopy, board)

      return { ...state, shape, board }

    default:
      return state
  }

}

export default gameReducer
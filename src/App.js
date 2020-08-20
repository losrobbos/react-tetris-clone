import React, { useReducer, useEffect, useRef } from 'react';
import './App.scss';
import Matrix from './components/Matrix'
import Field from './components/Field'
import ButtonStart from './components/ButtonStart'
import GameState from './components/GameState'
import gameReducer from './state/gameReducer';
import { initialState, gameStates } from './state/initialState';
import { initBoard, moveShape, initShape, pauseResumeGame } from './state/actions';
import useInterval from './hooks/useInterval';

const App = () => {

  const [state, dispatch ] = useReducer(gameReducer, initialState)
  const { board, shape, gameState, score, config } = state
  const refApp = useRef()

  // start game on first load
  useEffect(() => {
    console.log("Init board...")
    startGame()
  }, [])

  // once board loaded - init player (if we have none)
  useEffect(() => {
    if(board && !shape) {
      console.log("Init new shape...")
      dispatch(initShape())
    }
  }, [board, shape])

  const startGame = () => {
    refApp.current.focus() // make app able to listen to keyboard events by focussing it
    dispatch(initBoard())
  }

  // setup down move by fixed interval
  const moveDown = () => {    
    dispatch(moveShape("down"))
  }

  const gameRunning = () => {
    return gameState === gameStates.running
  }

  const gameOver = () => {
    return gameState === gameStates.lost
  }

  useInterval(moveDown, config.moveIntervalInSeconds*1000)

  const keyPressed = (e) => {
    let key = e.key.replace("Arrow", '').toLowerCase() // get which arrow was clicked

    if( e.keyCode === 32) { // spacebar
      dispatch(pauseResumeGame())
    } 
    else {
      dispatch(moveShape(key))
    }
  }

  const createMatrixUI = () => {
    return board.map((row, rowIndex) => row.map((field, colIndex) => (
      <Field key={rowIndex+"-"+colIndex} className="field" color={field.color}></Field>)
    ))
  }
  const jsxMatrix = createMatrixUI()
  
  // const strBoard = JSON.stringify(board, null, 2)

  return (
    <div ref={refApp} className="App" tabIndex={-1} onKeyDown={ gameOver() ? null : keyPressed}>
      <main>
        <Matrix height={480} rows={config.rows} cols={config.cols} className="stage" frozen={gameOver()} >{jsxMatrix}</Matrix>
      </main>
      <div>Score: {score}</div>
      <div className="controls">
        <GameState>{ gameRunning() || gameState }</GameState>
        { gameOver() && <ButtonStart onClick={startGame}>Restart Game</ButtonStart> }
      </div>
      {/* <button onClick={() => console.log(strBoard)}>Show board</button> */}
    </div>
  );
}

export default App;
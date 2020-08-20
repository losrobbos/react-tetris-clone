export const gameStates = { notstarted: 'notstarted', running: 'running', paused: 'paused', won: 'won', lost: 'lost' }
export const keys = { up: 'up', down: 'down', left: 'left', right: 'right' }
 
export const initialState = {
  board: [],
  shapes: [],
  config: { rows: 12, cols: 6, moveIntervalInSeconds: 1, baseColor: 'orange' },
  gameState: gameStates.running,
  score: 0
}
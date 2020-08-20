export const INIT_BOARD = "INIT_BOARD"
export const INIT_SHAPE = "INIT_SHAPE"
export const MOVE_SHAPE = "MOVE_SHAPE"
export const PAUSE_RESUME_GAME = "PAUSE_RESUME_GAME"

const action = (type, payload) => ({type, payload})

export const initBoard = () => action(INIT_BOARD)
export const initShape = () => action(INIT_SHAPE)
export const moveShape = (direction) => action(MOVE_SHAPE, direction)
export const pauseResumeGame = () => action(PAUSE_RESUME_GAME)
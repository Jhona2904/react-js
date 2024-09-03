import { useRef, useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Celda } from './components/Celda'
import { Turno } from './components/Turno'
import { ButtonReset } from './components/ButtonReset'
import { Winner } from './components/Winner'
import { Welcome } from './components/Modal/Welcome'
import { CSSTransition } from 'react-transition-group'
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import { Settings } from './components/Modal/Settings'
init({ data })

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('arr_board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn')
    return turnFromStorage ?? null
  })
  const [winner, setWinner] = useState(null)
  const [showModal, setShowModal] = useState(() => {
    const boardFromStorage = localStorage.getItem('arr_board')
    const turnFromStorage = localStorage.getItem('turn')
    const turnsFromStorage = localStorage.getItem('turns')
    if (boardFromStorage || turnsFromStorage || turnFromStorage) {
      return false
    }
    return true
  })
  const [turns, setTurns] = useState(() => {
    const turnsFromLS = localStorage.getItem('turns')
      ? JSON.parse(localStorage.getItem('turns'))
      : false
    return turnsFromLS || null
  })
  const nodeRef = useRef(null)
  const nodeMaskRef = useRef(null)
  const nodeRefSettings = useRef(null)
  const nodeRefWinner = useRef(null)
  const [showModalSettings, setShowModalSettings] = useState(false)
  const [showModalWinner, setShowModalWinner] = useState(false)

  const getSymbolsForTurn = (data) => {
    setTurn(data.turn1)
    setTurns(data)
    localStorage.setItem('turns', JSON.stringify(data))
    localStorage.setItem('turn', data.turn1)
  }

  const handleClick = (ix) => {
    if (board[ix] || winner) return
    const newBoard = [...board]
    const newTurn = turn === turns.turn1 ? turns.turn2 : turns.turn1
    newBoard[ix] = turn
    setBoard(newBoard)
    setTurn(newTurn)
    localStorage.setItem('arr_board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)
    const respWinner = checkWinningCondition(newBoard)
    if (respWinner) {
      confetti()
      setShowModalWinner(true)
      setWinner(respWinner)
    } else if (checkEndGame(newBoard)) {
      setShowModalWinner(true)
      setWinner(false)
    }
  }

  const checkEndGame = (arr) => {
    return arr.every((el) => el !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.turn1)
    setShowModalWinner(false)
    setWinner(null)
    localStorage.removeItem('arr_board')
    localStorage.setItem('turn', turns.turn1)
  }

  const resetGameSettings = () => {
    resetGame()
    handleClickSettings()
  }

  const checkWinningCondition = (arr) => {
    for (const element of WINNER_COMBINATIONS) {
      const [a, b, c] = element
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return turn
      }
    }
    return null
  }

  const closeModalWelcome = () => {
    setShowModal(false)
  }

  const handleClickSettings = () => {
    setShowModalSettings(!showModalSettings)
  }

  const changeEmoticons = () => {
    setShowModal(true)
    handleClickSettings()
    resetGame()
  }

  const resetLastIntent = () => {
    const newBoard = [...board]
    const itemsBoard = newBoard.filter((e) => e !== null)
    if (itemsBoard?.length) {
      const tamanio = itemsBoard.length
      if (tamanio == 0) return
      newBoard[tamanio - 1] = null
      const newTurn = turn === turns.turn1 ? turns.turn2 : turns.turn1
      setTurn(newTurn)
      localStorage.setItem('arr_board', JSON.stringify(newBoard))
      setBoard(newBoard)
    }
    handleClickSettings()
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 absolute top-6 right-8 cursor-pointer"
        onClick={handleClickSettings}
      >
        <path
          d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
          fill="#ffffff"
        />
      </svg>
      <CSSTransition
        in={showModalSettings}
        nodeRef={nodeRefSettings}
        timeout={150}
        classNames={{
          enter: 'opacity-0',
          enterActive: 'opacity-100 transition-all duration-150',
          exit: 'opacity-100',
          exitActive: 'opacity-0 transition-all duration-150'
        }}
        unmountOnExit
      >
        <Settings
          innerRef={nodeRefSettings}
          actionReset={resetGameSettings}
          actionChange={changeEmoticons}
          actionResetLastPlay={resetLastIntent}
        />
      </CSSTransition>
      <h1>¡3 en raya!</h1>
      <CSSTransition
        in={showModal}
        nodeRef={nodeRef}
        timeout={300}
        classNames={{
          enter: 'opacity-0 -translate-y-full',
          enterActive: 'opacity-100 translate-y-0 transition-all duration-300',
          exit: 'opacity-100 translate-y-0',
          exitActive: 'opacity-0 !-translate-y-full transition-all duration-300'
        }}
        unmountOnExit
        onEnter={() => setShowModal(true)}
        onExited={() => setShowModal(false)}
      >
        <Welcome
          innerRef={nodeRef}
          handleModal={closeModalWelcome}
          getTurn={getSymbolsForTurn}
        />
      </CSSTransition>
      <CSSTransition
        in={showModal || showModalWinner}
        timeout={150}
        nodeRef={nodeMaskRef}
        classNames={{
          enter: 'opacity-0',
          enterActive: 'opacity-100 transition-all duration-150',
          exit: 'opacity-100',
          exitActive: 'opacity-0 transition-all duration-150'
        }}
        unmountOnExit
      >
        <div className="mask-popup" ref={nodeMaskRef}></div>
      </CSSTransition>
      <ButtonReset handleReset={resetGame}>Reiniciar juego</ButtonReset>
      <div className="container">
        {board.map((_, ix) => {
          return (
            <Celda handleClick={handleClick} ix={ix} key={ix}>
              {board[ix] && <em-emoji id={board[ix]} size="2em"></em-emoji>}
            </Celda>
          )
        })}
      </div>
      {turns && turn && <Turno turn={turn} initialTurns={turns} />}
      <CSSTransition
        in={showModalWinner}
        nodeRef={nodeRefWinner}
        timeout={300}
        classNames={{
          enter: 'opacity-0 -translate-y-full',
          enterActive: 'opacity-100 translate-y-0 transition-all duration-300',
          exit: 'opacity-100 translate-y-0',
          exitActive: 'opacity-0 !-translate-y-full transition-all duration-300'
        }}
        unmountOnExit
      >
        <Winner
          winner={winner}
          handleReset={resetGame}
          innerRef={nodeRefWinner}
        />
      </CSSTransition>
    </div>
  )
}

export default App

import { useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const Welcome = ({ handleModal, getTurn, innerRef }) => {
  const [showOption1, setShowOption1] = useState(false)
  const [showOption2, setShowOption2] = useState(false)
  const [icon1, setIcon1] = useState(null)
  const [icon2, setIcon2] = useState(null)
  const [message, setMessage] = useState(null)

  const handleClick1 = (e) => {
    setIcon1(e.id)
    setShowOption1(false)
  }

  const handleClick2 = (e) => {
    setIcon2(e.id)
    setShowOption2(false)
  }

  const showOptions = (option) => {
    if (option == 1) {
      setShowOption1(!showOption1)
      setShowOption2(false)
      return
    }
    setShowOption1(false)
    setShowOption2(!showOption2)
  }

  const handleClick = () => {
    setMessage(null)
    if (icon1 === icon2) {
      setMessage('¡Los emoticones deben ser diferentes!')
      return
    }
    handleModal()
    getTurn({
      turn1: icon1,
      turn2: icon2
    })
  }

  return (
    <div className="mask-popup z-[11] !bg-transparent" ref={innerRef}>
      <div className="wrapper flex flex-col gap-4 items-center">
        <h2 className="font-bold text-2xl">¡BIENVENIDOS!</h2>
        <p>Elijan el emoticon para cada turno. 😁</p>
        <div className="flex flex-col items-center gap-4 relative">
          <div className="flex items-center justify-start gap-4">
            <label htmlFor="turn-1">Turno 1:</label>
            <button
              onClick={() => showOptions(1)}
              className="select-icon p-1 flex items-center justify-center gap-2 rounded-md"
            >
              Agregar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5"
              >
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                  fill="#ffffff"
                />
              </svg>
            </button>
            {icon1 && <em-emoji id={icon1} size="2em"></em-emoji>}
          </div>
          {showOption1 && <Picker data={data} onEmojiSelect={handleClick1} />}

          <div className="flex items-center justify-start gap-4">
            <label htmlFor="turn-1">Turno 2:</label>
            <button
              onClick={() => showOptions(2)}
              className="select-icon p-1 flex items-center justify-center gap-2 rounded-md"
            >
              Agregar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5"
              >
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                  fill="#ffffff"
                />
              </svg>
            </button>
            {icon2 && <em-emoji id={icon2} size="2em"></em-emoji>}
          </div>
          {showOption2 && <Picker data={data} onEmojiSelect={handleClick2} />}
        </div>
        {message && (
          <span className="text-red-600 font-bold text-xs">{message}</span>
        )}
        <button
          className="bg-[#0369a1] text-white font-black disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-0 p-2 rounded-lg"
          disabled={!icon1 || !icon2}
          onClick={handleClick}
        >
          EMPEZAR JUEGO
        </button>
      </div>
    </div>
  )
}

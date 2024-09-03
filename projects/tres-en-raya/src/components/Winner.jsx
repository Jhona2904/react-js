import { ButtonReset } from './ButtonReset'

export const Winner = ({ winner, handleReset, innerRef }) => {
  return (
    <div
      className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white z-[11] flex flex-col gap-4 items-center p-4 px-8 rounded-md text-black"
      ref={innerRef}
    >
      {winner === false && (
        <div className="flex items-center justify-center gap-3 flex-col">
          <h2 className="font-black text-xl uppercase text-[#0369a1]">
            UPS! Parece que hubo un:
          </h2>
          <h3 className="font-bold text-lg">¡EMPATE!</h3>
          <em-emoji id="scream" size="2em"></em-emoji>
        </div>
      )}
      {winner && (
        <div className="flex items-center justify-center gap-3 flex-col">
          <h2 className="font-black text-xl uppercase text-[#0369a1]">
            y el ganador fue:
          </h2>
          <em-emoji id={winner} size="2em"></em-emoji>
          <h3 className="font-bold text-lg">¡FELICITACIONES!</h3>
        </div>
      )}
      <ButtonReset handleReset={handleReset}>Reiniciar juego</ButtonReset>
    </div>
  )
}

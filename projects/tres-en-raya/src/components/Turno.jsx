export const Turno = ({ turn, initialTurns }) => {
  return (
    <div className="container-turns">
      <section
        className={
          'flex items-center gap-2 text-lg rounded-md ' +
          `${turn === initialTurns.turn1 ? 'active' : ''}`
        }
      >
        Jugador 1:
        <em-emoji id={initialTurns.turn1} size="2em"></em-emoji>
      </section>
      <section
        className={
          'flex items-center gap-2 text-lg rounded-md ' +
          `${turn === initialTurns.turn2 ? 'active' : ''}`
        }
      >
        Jugador 2:
        <em-emoji id={initialTurns.turn2} size="2em"></em-emoji>
      </section>
    </div>
  )
}

export const Celda = ({ children, handleClick, ix }) => {
  return (
    <div className="celda" onClick={() => handleClick(ix)} key={ix}>
      {children}
    </div>
  )
}

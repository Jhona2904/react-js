export const ButtonReset = ({ children, handleReset }) => {
  return (
    <button className="first p-2 rounded-md" onClick={handleReset}>
      {children}
    </button>
  )
}

const Form = ({ handleSubmit, handleChange, errors, wordSearch }) => {
  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <div className="search-input">
        <input
          type="text"
          placeholder="Avengers, Matrix ..."
          value={wordSearch}
          onChange={handleChange}
          style={{
            border: '1px solid transparent',
            borderColor: errors ? 'red' : 'transparent'
          }}
        />
        {errors && <span className="error">{errors}</span>}
      </div>
      <button type="submit">Buscar</button>
    </form>
  )
}

export default Form

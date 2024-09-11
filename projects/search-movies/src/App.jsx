import { useCallback, useState } from 'react'
import './App.css'
import Form from './components/Form'
import ListMovies from './components/ListMovies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const { wordSearch, setWordSearch, error } = useSearch()
  const [optionSort, setOptionSort] = useState('0')
  const { movies, getMovies, loading } = useMovies({ wordSearch, optionSort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log('search', search)
      getMovies({ wordSearch: search })
    }, 300),
    [getMovies]
  )

  const handleChange = (event) => {
    const search = event.target.value
    setWordSearch(search)
    debouncedGetMovies(search)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setOptionSort('0')
    getMovies({ wordSearch })
  }

  const handleSelectChange = (event) => {
    setOptionSort(event.target.value)
  }

  return (
    <div className="container-main">
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={error}
        wordSearch={wordSearch}
      />

      {movies.length > 0 && (
        <div className="select-custom">
          <label>Ordenar por:</label>
          <select
            name="order"
            id="order"
            onChange={handleSelectChange}
            value={optionSort}
          >
            <option value="0">Seleccione...</option>
            <option value="1">Año</option>
            <option value="2">Título</option>
          </select>
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <ListMovies movies={movies} />
      )}
    </div>
  )
}

export default App

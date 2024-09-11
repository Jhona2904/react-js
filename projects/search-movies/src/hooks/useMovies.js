import { useCallback, useMemo, useRef, useState } from 'react'
import { fetchMovies } from '../services/fetchMovies'
export function useMovies({ wordSearch, optionSort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const prevSearch = useRef(wordSearch)

  const getMovies = useCallback(async ({ wordSearch }) => {
    if (wordSearch === prevSearch.current) return
    try {
      setLoading(true)
      prevSearch.current = wordSearch
      const responseMovies = await fetchMovies({ wordSearch })
      setMovies(responseMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // const getMovies = useMemo(() => {
  //   return async ({ wordSearch }) => {
  //     if (wordSearch === prevSearch.current) return
  //     try {
  //       setLoading(true)
  //       prevSearch.current = wordSearch
  //       const responseMovies = await fetchMovies({ wordSearch })
  //       setMovies(responseMovies)
  //     } catch (error) {
  //       setError(error.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // }, [])

  const sortedMovies = useMemo(() => {
    return optionSort && optionSort === '1'
      ? [...movies].sort((a, b) => a.year < b.year)
      : optionSort && optionSort === '2'
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [optionSort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}

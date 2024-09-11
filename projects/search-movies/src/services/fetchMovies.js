const API_KEY = '71ba03b'
export const fetchMovies = async ({ wordSearch }) => {
  if (!wordSearch) return null
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${wordSearch}&apikey=${API_KEY}`
    )
    const json = await response.json()
    const movies = json.Search
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (error) {
    console.log(error.message)
    throw new Error('Failed to fetch movies')
  }
}

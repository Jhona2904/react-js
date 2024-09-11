function LisfAllMovies({ movies }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className="card-movie">
          <p>{movie.title}</p>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

const ListMovies = ({ movies }) => {
  return movies?.length > 0 ? (
    <LisfAllMovies movies={movies} />
  ) : (
    <p style={{ textAlign: 'center' }}>No hay películas para mostrar.</p>
  )
}

export default ListMovies

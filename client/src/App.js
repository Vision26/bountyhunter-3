import React, { useState, useEffect } from "react"
import axios from "axios"
import Movies from "./components/Movies"
import AddMovieForm from "./components/AddMovieForm"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])

  const getMovies = () => {
    axios.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getMovies()
  }, [])

  const createMovie = (newMovie) => {
    axios.post('/movies', newMovie)
    .then(res => setMovies(prevMovie => [...prevMovie, res.data]))
    .catch(err => console.log(err))
  }

const editMovie = (updated, id) => {
  axios.put(`/movies/${id}`, updated)
  .then(res => setMovies(prevMov => prevMov.map(mov => mov._id !== id ? mov : res.data)))
  .catch(err => console.log(err))
}

const deleteMovie = deleteId => {
  axios.delete(`/movies/${deleteId}`)
  .then(res => setMovies(prevMovi => prevMovi.filter(pre => {
    return pre._id !==  deleteId
  })))
  .catch(err => console.log(err))
}

const handleFilter = e => {
  if(e.target.value === "reset"){
    getMovies()
  } else {
    axios.get(`/movies/search/genre?genre=${e.target.value}`)
    .then(res => setMovies(res.data))
    .catch(err => console.log(err))
  }
}

  return (
    <div className="movie-container">
      <AddMovieForm 
      submit={createMovie}
      btnText="Add Movie"
      />

      {/* //you can place this next to the inputs to avoid future spelling bug */}
      <h4>Filter by Genre</h4>
      <select onChange={handleFilter} className="filter-form">
        <option value="reset">All Movies</option>
        <option value="action">Action</option>
        <option value="fantasy">Fantasy</option>
        <option value="horror">Horror</option>
      </select>

      {movies.map(movie => 
      <Movies 
      key={movie.title} 
      edit={editMovie}
      deleteMov={deleteMovie}
      {...movie} />)}
    </div>
  )
}

export default App
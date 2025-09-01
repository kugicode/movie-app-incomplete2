import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar';
import axios from 'axios';
import MovieCard from './components/MovieCard';

function App() {
const [movie, setMovie] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [result, setResult] = useState([]);


async function fetchMovieData(){

try{
  setIsLoading(true);
const API_URL = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${import.meta.env.VITE_API_KEY}`;
const { data } = await axios.get(API_URL);


setIsLoading(false);
console.log(data);
setResult(data.results);

}

catch(error){
setIsLoading(false);
setErrorMessage('No movies found, sorry.');
}
  
}

  return (
    <>
      <SearchBar movie={movie} setMovie={setMovie}/>
      <button onClick={fetchMovieData}>search</button>


      <div>
        
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
        result.map(m => (
          <div key={m.id}>
            <h3>{m.title}</h3>
            <MovieCard image={m.poster_path}/>
         
          </div>
        )))}
      </div>
    </>
  )
}

export default App
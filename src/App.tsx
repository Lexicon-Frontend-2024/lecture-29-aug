import { useEffect, useRef, useState } from "react";
import Button from "./components/Button";
import Movies from "./components/Movies";
import { IMovie } from "./Interfaces/MovieInterfaces";

export default function App() {
  const API_URL = "https://ghibliapi.vercel.app/films/";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [showMovies, setShowMovies] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // useEffect(callback, dependency);
  useEffect(() => {
    // sätta fokus på sökfältet när komponenten mountas
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const fetchFilms = async () => {
      try {
        const response = await fetch(API_URL);
        console.log(response);

        if (!response.ok) {
          // kasta ett fel till användaren
          throw new Error('Det gick fel vid vår hämtning av data från API:et');
        }
        const data: IMovie[] = await response.json();
        setMovies(data);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
    fetchFilms();
  }, []); // beroendelista är tom så useEffect enbart körs när komponenten mountas

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setSearchTerm(value);
    // filtrera filmer efter sökning
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  }

  return (
    <main>
      {
        errorMessage ? <p>{errorMessage}</p> : null
      }
      {/* sökfält */}
      <input
        type="text"
        placeholder="Sök efter en film..."
        ref={searchInputRef}
        onChange={handleSearchChange}
      />
      {
        filteredMovies ?
          <Movies movies={filteredMovies} />
          :
          null
      }
      {
        showMovies ?
          <Movies movies={movies} />
          :
          <Button title="Visa alla filmer" action={() => { setShowMovies(true) }} />
      }
    </main>
  )
}

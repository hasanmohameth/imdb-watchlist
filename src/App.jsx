import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import "./index.css";
import Wellcome from "./components/Wellcome";
import {
  useQuery,
 
} from '@tanstack/react-query'






const KEY = "e8f6da44";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const stored = localStorage.getItem("watched");
    return stored ? JSON.parse(stored) : [];
  });

  function handleSelectMovie(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   async function fetchMovies() {
  //     try {
  //       setIsLoading(true);
  //       setError("");

  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
  //         { signal: controller.signal }
  //       );

  //       if (!res.ok) throw new Error("Something went wrong fetching movies");

  //       const data = await res.json();
  //       if (data.Response === "False") throw new Error("Movie not found");

  //       setMovies(data.Search);
  //       setError("");
  //       console.log(data)

        
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   if (query.length < 3) {
  //     setMovies([]);
  //     setError("");
  //     return;
  //   }

  //   handleCloseMovie();
  //   fetchMovies();

  //   return () => controller.abort();
  // }, [query]);

  // in my new update i used Reacr Query boom

  const {data,error,isLoading} = useQuery({

    queryKey:['users',query],
    queryFn : ()=> fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`).then(res => res.json())

  })

   if (error) {
    
    return <span><ErrorMessage /></span>
  }

  return (
    <>   

      <NavBar >
        
        <NavBar.Search query={query} setQuery={setQuery} />
        <NavBar.NumResults movies={movies} />       

      </NavBar>

      <Main>
        
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList  onSelectMovie={handleSelectMovie} data={data?.Search || []}  />
          )}      
          
              {query?null :<Wellcome />}

          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
        
      </Main>      

    </>
  );
}

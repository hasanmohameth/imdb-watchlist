import React, { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import "../index.css";
import { useQuery } from '@tanstack/react-query';

const KEY = "e8f6da44";

const fetchMovieDetails = async (selectedId) => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
  );
  const data = await res.json();
  return data;
};
// const [movie, setMovie] = useState({});
//  const [isLoading, setIsLoading] = useState(false);


export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((m) => m.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((m) => m.imdbID === selectedId)?.userRating;

  // useEffect(() => 
  //   { async function getMovieDetails()
  //      { setIsLoading(true); const res = await fetch( https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId} );
  //        const data = await res.json();
  //         setMovie(data); setIsLoading(false); } getMovieDetails(); },
  //          [selectedId]);

  const { isLoading, data: movie, error } = useQuery({
    queryKey: ['movieDetails', selectedId],
    queryFn: () => fetchMovieDetails(selectedId),
    enabled: !!selectedId, 
  });

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") onCloseMovie();
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [onCloseMovie]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie?.Title,
      year: movie?.Year,
      poster: movie?.Poster,
      imdbRating: Number(movie?.imdbRating),
      runtime: Number(movie?.Runtime?.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  if (isLoading) return <Loader />;

  if (error) return <div>Error fetching movie details: {error.message}</div>;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>

        {movie?.Poster && movie.Poster !== "N/A" ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <img src="/no-poster.png" alt="No poster available" />
        )}

        <div className="details-overview">
          <h2>{movie?.Title}</h2>
          <p>
            {movie?.Released} &bull; {movie?.Runtime}
          </p>
          <p>{movie?.Genre}</p>
          <p>
            <span>⭐️</span> {movie?.imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated this movie {watchedUserRating} <span>⭐️</span>
            </p>
          )}
        </div>
        <p>
          <em>{movie?.Plot}</em>
        </p>
        <p>Starring {movie?.Actors}</p>
        <p>Directed by {movie?.Director}</p>
      </section>
    </div>
  );
}

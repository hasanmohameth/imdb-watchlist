import React from "react";
import WatchedMovie from "./WatchedMovie";
import "../index.css";
import EmptyPlaylist from "./EmptyPlaylist";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
  {watched.length >= 1 ? null : <EmptyPlaylist />}

      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

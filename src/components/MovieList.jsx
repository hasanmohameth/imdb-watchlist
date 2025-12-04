import React from "react";
import Movie from "./Movie";
import "../index.css";

export default function MovieList({ data, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {data?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

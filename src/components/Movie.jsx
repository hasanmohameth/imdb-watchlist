import React from "react";
import "../index.css";

export default function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>{movie.Year}</span>
        </p>
<a
  href={`https://www.google.com/search?q=${encodeURIComponent(movie.Title)}`}
  target="_blank"
  rel="noreferrer"

>
  More info
</a>

      </div>
    </li>
  );
}

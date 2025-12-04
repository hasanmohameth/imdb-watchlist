import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import "../index.css";


export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}




NavBar.Search = Search;
NavBar.NumResults = NumResults;

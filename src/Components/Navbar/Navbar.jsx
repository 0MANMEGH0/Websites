import React, { useState } from "react";
import pokeballIcon from "../Assets/pokeball.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // To store the timeout ID
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setLoading(true); // Start loading state

      // Clear previous timeout if any
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set timeout for 10 seconds to prevent hanging requests
      const newTimeoutId = setTimeout(() => {
        setLoading(false);
        alert("The request timed out. Please try again.");
      }, 10000); // Timeout after 10 seconds
      setTimeoutId(newTimeoutId);

      // Make the API request
      fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          clearTimeout(newTimeoutId); // Clear the timeout if the request succeeds
          setLoading(false);
          navigate(`/pokemon/${search.toLowerCase()}`);
          setSearch(""); // Reset search field
        })
        .catch((error) => {
          clearTimeout(newTimeoutId); // Clear the timeout if the request fails
          setLoading(false);
          alert("Error fetching data, please try again later.");
        });
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={pokeballIcon}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-center me-3"
            />
            <span style={{ color: "#F08080" }}>Poke</span>Verse
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pokedex">
                  Pokédex
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type Chart
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/normal"
                      style={{ color: "grey" }}
                    >
                      Normal
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/fire"
                      style={{ color: "#FF7F50" }}
                    >
                      Fire 🔥
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/water"
                      style={{ color: "#00BFFF" }}
                    >
                      Water 💧
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/electric"
                      style={{ color: "#DAA520" }}
                    >
                      Electric ⚡
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/grass"
                      style={{ color: "#228B22" }}
                    >
                      Grass 🌿
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/ice"
                      style={{ color: "#B0E0E6" }}
                    >
                      Ice ❄️
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/fighting"
                      style={{ color: "#DC143C" }}
                    >
                      Fighting 🥊
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/poison"
                      style={{ color: "#9400D3" }}
                    >
                      Poison ☠️
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/ground"
                      style={{ color: "#3CB371" }}
                    >
                      Ground 🌍
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/flying"
                      style={{ color: "#87CEFA" }}
                    >
                      Flying 🕊️
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/psychic"
                      style={{ color: "#DB7093" }}
                    >
                      Psychic 🧠
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/bug"
                      style={{ color: "#808000" }}
                    >
                      Bug 🐛
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/rock"
                      style={{ color: "#708090" }}
                    >
                      Rock 🪨
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/ghost"
                      style={{ color: "#663399" }}
                    >
                      Ghost 👻
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/dragon"
                      style={{ color: "#98FB98" }}
                    >
                      Dragon 🐉
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/dark"
                      style={{ color: "#705746" }}
                    >
                      Dark 🌑
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/steel"
                      style={{ color: "#B7B7CE" }}
                    >
                      Steel ⚙️
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/type/fairy"
                      style={{ color: "#FFD700" }}
                    >
                      Fairy ✨
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/game">
                  Game
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by Pokemon Name or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                type="submit"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const typeColors = {
  fire: "#FF7F50",
  water: "#00BFFF",
  electric: "#DAA520",
  grass: "#228B22",
  ice: "#B0E0E6",
  fighting: "#DC143C",
  poison: "#9400D3",
  ground: "#3CB371",
  flying: "#87CEFA",
  psychic: "#DB7093",
  bug: "#808000",
  rock: "#708090",
  ghost: "#663399",
  dragon: "#98FB98",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#FFD700",
  normal: "grey",
};

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [sortType, setSortType] = useState("id");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const limit = 51; // Number of Pokémon per page

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);

      // Fetch the first page to get the total count of Pokémon
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100"); // Fetch first chunk
      const data = await res.json();
      const totalPokemon = data.count; // Total Pokémon count

      // Fetch all Pokémon data (in chunks of 100)
      let allPokemon = [];
      for (let offset = 0; offset < totalPokemon; offset += 100) {
        const pageRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
        );
        const pageData = await pageRes.json();

        const detailedData = await Promise.all(
          pageData.results.map(async (p) => {
            const detailsRes = await fetch(p.url);
            const details = await detailsRes.json();
            return {
              id: details.id,
              name: details.name,
              types: details.types.map((t) => t.type.name),
            };
          })
        );
        allPokemon = [...allPokemon, ...detailedData];
      }

      setPokemonList(allPokemon);
      setTotalPokemon(allPokemon.length);
      setLoading(false);
      setDisplayedPokemon(allPokemon.slice(0, limit)); // Display first 50 Pokémon
    };

    fetchAllPokemon();
  }, []);

  const handleSortChange = (e) => {
    const type = e.target.value;
    setSortType(type);

    const sortedList = [...pokemonList];
    if (type === "id") {
      sortedList.sort((a, b) => a.id - b.id);
    } else if (type === "name") {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "type") {
      sortedList.sort((a, b) =>
        (a.types[0] || "").localeCompare(b.types[0] || "")
      );
    }
    setPokemonList(sortedList);
  };

  const paginate = (pageNumber) => {
    const start = (pageNumber - 1) * limit;
    const end = pageNumber * limit;
    setDisplayedPokemon(pokemonList.slice(start, end));
    setCurrentPage(pageNumber);
  };

  // Pagination logic (creating page numbers)
  const totalPages = Math.ceil(totalPokemon / limit);

  return (
    <div
      style={{
        backgroundColor: "#EDE4E4",
        minHeight: "100vh",
        paddingTop: "20px",
        marginBottom: "0",
      }}
    >
      <div className="container">
        <h2 className="mb-4 text-center">Pokédex</h2>

        <div className="text-center mb-4">
          <select
            className="form-select w-auto d-inline color-white"
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center">Loading Pokédex...</p>
        ) : (
          <div className="row">
            {displayedPokemon.map((p) => (
              <div className="col-lg-4 col-md-6 mb-4" key={p.id}>
                <div
                  className="card h-100 text-center card-hover shadow-sm"
                  style={{
                    transition: "transform 0.3s, box-shadow 0.3s, opacity 0.6s",
                    opacity: 1,
                    background: "white",
                    borderRadius: "15px",
                  }}
                >
                  <img
                    src={`https://img.pokemondb.net/artwork/large/${p.name}.jpg`}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      padding: "10px",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-capitalize">{p.name}</h5>
                    <p className="mb-1">ID: #{p.id}</p>
                    <div className="mb-2">
                      {p.types.map((type) => (
                        <span
                          key={type}
                          className="badge mx-1 text-capitalize"
                          style={{
                            backgroundColor: typeColors[type] || "gray",
                            color: "white",
                            fontSize: "0.9rem",
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/pokemon/${p.name}`}
                      className="btn btn-outline-dark mt-auto"
                    >
                      View Pokédex
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls with only arrows and current page */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mb-4">
            <nav
              aria-label="Page navigation example"
              style={{ backgroundColor: "#343a40", borderRadius: "5px" }}
            >
              <ul className="pagination mb-0">
                {currentPage > 1 && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      style={{
                        color: "#f8f9fa",
                        backgroundColor: "#333",
                        border: "1px solid #6c757d",
                      }}
                    >
                      &lt;
                    </button>
                  </li>
                )}
                <li className="page-item active">
                  <button
                    className="page-link"
                    style={{
                      color: "#333",
                      backgroundColor: "white",
                      border: "1px solid #6c757d",
                    }}
                  >
                    {currentPage}
                  </button>
                </li>
                {currentPage < totalPages && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      style={{
                        color: "white",
                        backgroundColor: "#333",
                        border: "1px solid #6c757d",
                      }}
                    >
                      &gt;
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Hover and animation */}
      <style>{`
        .card-hover:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Pokedex;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const typeColors = {
  normal: "grey",
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
};

const typeBackgrounds = {
  normal: "#D9D9D9",
  fire: "#FFD3C4",
  water: "#BDEEFF",
  electric: "#DECE9E",
  grass: "#A9DBA9",
  ice: "#D1DFE6",
  fighting: "#E0A8B4",
  poison: "#D1ACE8",
  ground: "#95AD9E",
  flying: "#D6EFFF",
  psychic: "#CC9FAE",
  bug: "#B5B57D",
  rock: "#AEB1B5",
  ghost: "#BAA0BA",
  dragon: "#D4FCD4",
  dark: "#333",
  steel: "#B7B7CE",
  fairy: "#FFEB9C",
};

const TypePokemonList = () => {
  const { typeName } = useParams();
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCount, setShowCount] = useState(20);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
      const data = await res.json();

      const pokemonData = await Promise.all(
        data.pokemon.map(async (p) => {
          const res = await fetch(p.pokemon.url);
          const details = await res.json();
          return {
            name: details.name,
            id: details.id,
            types: details.types.map((t) => t.type.name),
          };
        })
      );

      setAllPokemonList(pokemonData);
      setDisplayedPokemon(pokemonData.slice(0, 20));
      setLoading(false);
      setShowCount(20);
    };

    if (typeName) fetchPokemon();
  }, [typeName]);

  const handleShowMore = () => {
    const nextCount = showCount + 20;
    setDisplayedPokemon(allPokemonList.slice(0, nextCount));
    setShowCount(nextCount);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        transition: "background-color 0.5s ease",
        backgroundColor: typeBackgrounds[typeName] || "#fff",
      }}
    >
      <div className="container">
        <h2
          className="mb-4 text-center text-capitalize"
          style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontWeight: 400,
            fontStyle: "normal",
            background: "#F5F5F5",
            border: "1px solid grey",
            color: typeColors[typeName] || "#fff",
            borderRadius: "10px",
          }}
        >
          {typeName} Type Pokémon
        </h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <div className="row">
              {displayedPokemon.map((p) => (
                <div className="col-lg-4 col-md-6 mb-4" key={p.id}>
                  <div
                    className="card h-100 text-center card-hover shadow-sm"
                    style={{
                      transition:
                        "transform 0.3s, box-shadow 0.3s, opacity 0.6s",
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

            {/* Show More button */}
            {showCount < allPokemonList.length && (
              <div className="text-center mb-0">
                <button className="btn btn-dark mb-5" onClick={handleShowMore}>
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Smooth hover and fade-in effects */}
      <style>{`
        .card-hover:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default TypePokemonList;

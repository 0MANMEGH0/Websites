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

// 🆕 Move getEvolutionData outside
const getEvolutionData = (chain) => {
  let evo = [];
  let current = chain;
  while (current) {
    evo.push({
      name: current.species.name,
      url: `https://img.pokemondb.net/sprites/home/normal/${current.species.name}.png`,
    });
    current = current.evolves_to[0];
  }
  return evo;
};

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Pokémon not found");
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        setSpecies(speciesData);

        const typeRes = await fetch(data.types[0].type.url);
        const typeData = await typeRes.json();
        const weakTo = typeData.damage_relations.double_damage_from.map(
          (t) => t.name
        );
        setWeaknesses(weakTo);

        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();
        const evolutionInfo = getEvolutionData(evolutionData.chain);
        setEvolutionChain(evolutionInfo);

        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemonData();
  }, [id]);

  useEffect(() => {
    if (pokemon) {
      const primaryType = pokemon.types?.[0]?.type?.name;
      document.body.style.backgroundColor =
        typeBackgrounds[primaryType] || "#fff";
    }

    return () => {
      document.body.style.backgroundColor = "#fff"; // Reset on unmount
    };
  }, [pokemon]);

  if (error) return <div className="text-center text-danger mt-5">{error}</div>;
  if (!pokemon || !species)
    return <div className="text-center mt-5">Loading...</div>;

  const description =
    species.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") || "No description available.";
  const category =
    species.genera.find((entry) => entry.language.name === "en")?.genus ||
    "Unknown Category";

  const maxStat = 150;

  const heightInFeet = pokemon.height / 10 / 3.048;
  const heightFeet = Math.floor(heightInFeet);
  const heightInches = Math.round((heightInFeet - heightFeet) * 12);
  const weightInLbs = pokemon.weight * 0.220462;
  const weightLbs = Math.round(weightInLbs);

  return (
    <div className="container mt-5 mb-5">
      <div className="row g-4">
        {/* Left Block: Image + Stats */}
        <div className="col-md-6">
          <div
            className="p-3 shadow rounded bg-dark h-100"
            style={{ color: "white" }}
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="img-fluid d-block mx-auto mb-4"
              style={{ maxHeight: "200px" }}
            />
            <h5 className="text-center">Base Stats</h5>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-2">
                <strong>{stat.stat.name.toUpperCase()}</strong>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${(stat.base_stat / maxStat) * 100}%`,
                      background: "#F08080",
                    }}
                    aria-valuenow={stat.base_stat}
                    aria-valuemin="0"
                    aria-valuemax={maxStat}
                  >
                    {stat.base_stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Block: Desc + Info + Type/Weakness */}
        <div className="col-md-6">
          <div className="p-3 shadow rounded bg-light h-100 d-flex flex-column">
            {/* Description */}
            <div className="mb-2">
              <h2 className="text-capitalize mb-3">{pokemon.name}</h2>
              <p className="text-muted">{description}</p>
            </div>

            {/* Info */}
            <div className="mb-3">
              <div
                className="p-3 shadow-sm rounded"
                style={{ background: "#333", color: "white" }}
              >
                <p>
                  <strong>Height:</strong> {heightFeet}’ {heightInches}”
                </p>
                <p>
                  <strong>Weight:</strong> {weightLbs} lbs
                </p>
                <p>
                  <strong>Category:</strong> {category}
                </p>
                <p>
                  <strong>Abilities:</strong>{" "}
                  {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </p>
                <p>
                  <strong>Generation:</strong>{" "}
                  {species.generation.name
                    .replace("generation-", "Generation ")
                    .toUpperCase()}
                </p>
              </div>
            </div>

            {/* Type and Weakness */}
            <div>
              <h5>Type</h5>
              {pokemon.types.map((t) => (
                <Link
                  key={t.type.name}
                  to={`/type/${t.type.name}`}
                  className="badge mx-1 mb-2 text-capitalize"
                  style={{
                    backgroundColor: typeColors[t.type.name],
                    color: "white",
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                >
                  {t.type.name}
                </Link>
              ))}

              <h5 className="mt-4">Weaknesses</h5>
              {weaknesses.map((w) => (
                <Link
                  key={w}
                  to={`/type/${w}`}
                  className="badge mx-1 mb-2 text-capitalize"
                  style={{
                    backgroundColor: typeColors[w] || "gray",
                    color: "white",
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                >
                  {w}
                </Link>
              ))}
            </div>

            {/* Evolution Chain */}
            <h5 className="mt-3">Evolution Chain</h5>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
              {evolutionChain.map((evo) => (
                <Link
                  key={evo.name}
                  to={`/pokemon/${evo.name}`}
                  className="text-center text-decoration-none"
                  style={{ width: "80px" }}
                >
                  <img
                    src={evo.url}
                    alt={evo.name}
                    className="img-fluid rounded-circle mb-2"
                    style={{
                      background: "#f8f9fa",
                      padding: "5px",
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-capitalize small" style={{ color: "" }}>
                    {evo.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;

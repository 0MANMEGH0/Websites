import React from "react";
import { Link } from "react-router-dom";
import pokeball from "./Assets/pokeball.png";
import runningPikachu from "./Assets/pikachu-run.gif";

const Home = () => {
  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "300vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Hero Section */}
      <section
        className="text-center mb-5 fade-in"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="display-2 fw-bold" style={{ color: "#F08080" }}>
          Welcome to <span style={{ color: "#2c3e50" }}>PokeVerse!</span>
        </h1>
        <p className="lead text-muted fs-4 mt-3">
          Discover Pokémon, explore types, and master the world of Pokédex!
        </p>

        <div className="d-flex justify-content-center gap-4 mt-5">
          <Link to="/pokedex" className="btn btn-dark btn-lg px-5 py-3">
            Browse Pokédex
          </Link>
          <Link to="/type/fire" className="btn btn-danger btn-lg px-5 py-3">
            Explore Types
          </Link>
        </div>

        {/* Bouncing Pokeball */}
        <div className="mt-5">
          <img
            src={pokeball}
            alt="Pokeball"
            className="bouncing"
            style={{ width: "100px", opacity: 0.8 }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        className="container mb-5 fade-in"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 className="text-center mb-5 fs-1">What You Can Do</h2>
        <div className="row text-center g-5">
          {[
            {
              title: "Browse Pokédex",
              desc: "View full Pokémon list with stats, abilities, types, and more!",
              link: "/pokedex",
              btn: "dark",
            },
            {
              title: "Explore Types",
              desc: "Find Pokémon by their type — fire, water, grass, and more!",
              link: "/type/fire",
              btn: "danger",
            },
            {
              title: "Play Game",
              desc: "Test your knowledge in the Mysterymon guessing game!",
              link: "/game",
              btn: "dark",
            },
          ].map((item, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-lg card-hover p-4">
                <div className="card-body">
                  <h5 className="card-title fs-3">{item.title}</h5>
                  <p className="card-text fs-5">{item.desc}</p>
                  <Link
                    to={item.link}
                    className={`btn btn-outline-${item.btn} btn-lg mt-3`}
                  >
                    {item.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Pokémon Section */}
      <section
        className="container mb-0 fade-in"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 className="text-center mb-5 fs-1">Popular Pokémon</h2>
        <div className="row text-center g-4">
          {[
            "pikachu",
            "charizard",
            "mewtwo",
            "greninja",
            "lucario",
            "bulbasaur",
          ].map((name) => (
            <div className="col-6 col-md-2 mb-4" key={name}>
              <Link to={`/pokemon/${name}`} className="popular-link">
                <img
                  src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
                  alt={name}
                  className="img-fluid rounded-circle shadow floating"
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.15)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <p className="text-capitalize mt-4 fs-5 pokemon-name">{name}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Animations CSS */}
      <style>
        {`
        .card-hover:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 15px 25px rgba(0,0,0,0.2);
          transition: all 0.4s ease-in-out;
        }

        .fade-in {
          animation: fadeIn 1.5s ease-in;
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .bouncing {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
          .pikachu-intersection {
            width: 100%;
            text-align: center;
            background-color: transparent;
            margin-bottom: 0px;
            margin-top: -40px;
            z-index: 2;
            position: relative;
          }

          .pikachu-runner {
            height: 60px;
            animation: bounce 1.2s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .popular-link {
            text-decoration: none;
            color: inherit;
          }

          .popular-link:hover {
            text-decoration: none;
          }

          .pokemon-name {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 400;
            color: #212529;
            margin-top: 12px;
            transition: color 0.3s ease;
          }

          .popular-link:hover .pokemon-name {
            color: #e63946; /* or any hover color you like */
          }
      `}
      </style>
      <div className="pikachu-intersection">
        <img
          src={runningPikachu}
          alt="Running Pikachu"
          className="pikachu-runner"
        />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import logo from "../Assets/logo.png";
import unmuteIcon from "../Assets/unmute.png";
import muteIcon from "../Assets/mute.png";
import whoSoundFile from "../Assets/who.mp3";
import confetti from "canvas-confetti";

const Game = () => {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [correctPokemon, setCorrectPokemon] = useState(null);
  const [result, setResult] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const whoSoundRef = useRef(null);
  const navigate = useNavigate();

  const fetchSinglePokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      image: data.sprites.other["official-artwork"].front_default,
    };
  };

  const getUniqueRandomNumbers = (count, min, max) => {
    const nums = new Set();
    while (nums.size < count) {
      nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return [...nums];
  };

  const loadGameData = async () => {
    setLoading(true);
    const ids = getUniqueRandomNumbers(4, 1, 1010);

    try {
      const fetchedPokemons = await Promise.all(ids.map(fetchSinglePokemon));
      const correct =
        fetchedPokemons[Math.floor(Math.random() * fetchedPokemons.length)];

      setPokemons(fetchedPokemons);
      setCorrectPokemon(correct);
      setResult("");
      setLoading(false);

      // ✅ Play "Who's that Pokémon" AFTER everything is loaded
      setTimeout(() => {
        if (!isMuted && whoSoundRef.current) {
          whoSoundRef.current.currentTime = 0;
          whoSoundRef.current.play();
        }
      }, 300); // Small delay (300ms) to make sure new Pokémon is shown first
    } catch (error) {
      console.error("Failed to load Pokémon data", error);
      alert("Failed to load Pokémon. Try again!");
      setLoading(false);
    }
  };
  useEffect(() => {
    loadGameData();
  }, []);

  const handleOptionClick = (selectedName) => {
    if (selectedName === correctPokemon.name) {
      setScore((prev) => prev + 1);
      setResult(`Correct! It's ${correctPokemon.name}!`);
      const colors = [
        "#ff0000",
        "#ff7f00",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#4b0082",
        "#9400d3",
      ];

      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: colors,
        scalar: 1.2,
        ticks: 200,
        shapes: ["circle"],
      });
      setTimeout(() => {
        loadGameData();
      }, 3000);
    } else {
      setResult(`Wrong! It was ${correctPokemon.name}!`);
      setScore(0);
      if (navigator.vibrate) navigator.vibrate(300);
      setShowPlayAgain(true);
    }
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    showAlert(isMuted ? "Sound Unmuted 🔊" : "Sound Muted 🔇");
  };

  const showAlert = (message) => {
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert-message";
    alertDiv.textContent = message;
    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  };

  const handlePlayAgain = (choice) => {
    if (choice) {
      setShowPlayAgain(false);
      loadGameData();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-dark text-white text-center vh-100 overflow-hidden">
      <div className="container pt-0 mt-5">
        <img
          className="logo mx-auto d-block"
          src={logo}
          alt="Mysterymon Logo"
        />

        <div className="d-flex justify-content-between align-items-center w-100 px-3 mt-4">
          <p className="fs-4 fw-bold mb-0">Score: {score}</p>
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="audio-button btn d-flex align-items-center justify-content-center"
          >
            <img
              id="who-icon"
              src={isMuted ? muteIcon : unmuteIcon}
              alt={isMuted ? "Muted" : "Unmuted"}
            />
          </button>
        </div>

        <div className="position-relative mx-auto image-wrapper mb-5 mt-5">
          {correctPokemon?.image && (
            <img
              id="pokemon-image"
              src={correctPokemon.image}
              alt="Hidden Pokémon"
              className={`img-fluid ${
                result.includes("Correct") || result.includes("Wrong")
                  ? "revealed"
                  : ""
              }`}
            />
          )}
        </div>

        <div className="row row-cols-2 g-3 justify-content-center mb-3 mt-5">
          {pokemons.map((pokemon) => (
            <div className="col" key={pokemon.id}>
              <button
                className="btn btn-secondary w-100"
                onClick={() => handleOptionClick(pokemon.name)}
                disabled={!!result && !result.includes("Thanks")}
              >
                {pokemon.name}
              </button>
            </div>
          ))}
        </div>

        <p id="result" className="fs-5">
          {result}
        </p>

        {loading && <div id="loading" className="spinner mx-auto"></div>}

        <audio id="who-sound" ref={whoSoundRef}>
          <source src={whoSoundFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div id="alert-container" className="alert-container"></div>

        {showPlayAgain && (
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content bg-dark text-white">
                <div className="modal-header">
                  <h5 className="modal-title">Game Over!</h5>
                </div>
                <div className="modal-body">
                  <p>Do you want to play again?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handlePlayAgain(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handlePlayAgain(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;

import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa"; // <-- Import icons

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#333", color: "#fff", padding: "40px 0" }}
    >
      <div className="pikachu-runner-wrapper"></div>
      <div className="container text-center">
        {/* Brand Name */}
        <h4 className="mb-3">
          <span style={{ color: "#F08080" }}>Poke</span>Verse
        </h4>
        <p className="mb-4">
          Explore the amazing world of Pokémon — Search, Learn, and Play!
        </p>
        <p>Follow Me :- </p>
        {/* Social Links */}
        <div className="mb-4">
          <a
            href="https://www.instagram.com/__manmegh__1710__/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light mx-2 d-inline-flex align-items-center"
          >
            <FaInstagram className="me-2" />
          </a>
          <a
            href="https://www.linkedin.com/in/manmegh-pawar/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light mx-2 d-inline-flex align-items-center"
          >
            <FaLinkedin className="me-2" />
          </a>
          <a
            href="mailto:man.mn.gh@example.com"
            className="btn btn-outline-light mx-2 d-inline-flex align-items-center"
          >
            <FaEnvelope className="me-2" />
          </a>
        </div>

        {/* Copyright */}
        <p className="small mb-0">
          &copy; 2025 PokeVerse. Built with ❤️ for Pokémon fans.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const AboutUs = () => {
  return (
    <div
      className="about-page d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "#EDE4E4",
        color: "black",
      }}
    >
      <div className="container text-center py-5">
        <h1 className="mb-4">About Us</h1>
        <p className="lead mb-4">
          Welcome to{" "}
          <strong>
            <span style={{ color: "#F08080" }}>Poke</span>Verse
          </strong>{" "}
          — your ultimate companion for exploring the world of Pokémon!
        </p>
        <p>
          This project is built by passionate fan who love Pokémon as much as
          you do. Whether you're researching your favorite creatures, exploring
          types, or testing your knowledge in the game — we've got you covered.
        </p>
        <p>Made with ❤️ using React, PokéAPI, and a lot of Poké-love!</p>
        <div className="text-center mt-5">
          <h3 className="mt-5 mb-4">Contact Me</h3>
          <div className="container d-flex justify-content-center mb-5">
            <div className="row g-3">
              <div className="col-md-4">
                <a
                  href="mailto:man.mn.gh@gmail.com"
                  className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-envelope-fill"></i>Email
                </a>
              </div>
              <div className="col-md-4">
                <a
                  href="https://www.linkedin.com/in/manmegh-pawar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-linkedin"></i>LinkedIn
                </a>
              </div>
              <div className="col-md-4">
                <a
                  href="https://github.com/0MANMEGH0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-github"></i>GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

import React from "react";
import { Send } from "@mui/icons-material";

const Newsletter = () => {
  return (
    <section className="newsletter-container">
      <h2 className="newsletter-title">Newsletter</h2>
      <p className="newsletter-tagline">
        Get timely updates from your favorite products
      </p>
      <form action="" className="newsletter-form">
        <input
          type="text"
          placeholder="Your email"
          className="newsletter-input"
        />
        <button className="newsletter-button">
          <Send />
        </button>
      </form>
    </section>
  );
};

export default Newsletter;

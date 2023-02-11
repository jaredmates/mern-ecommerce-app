import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <Helmet>
        <title>Error</title>
      </Helmet>
      <h1 className="error-code">404</h1>
      <h4 className="error-description">page not found</h4>
      <Link to="/">
        <Button variant="contained" color="secondary" size="large">
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;

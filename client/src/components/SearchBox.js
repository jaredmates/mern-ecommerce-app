import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const SearchBox = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <Form className="ms-3 w-50" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-dark" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;

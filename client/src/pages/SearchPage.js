import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import getError from "../utils/getError.js";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

import LinkContainer from "react-router-bootstrap/LinkContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { useSelector, useDispatch } from "react-redux";
import {
  searchFetchRequest,
  searchFetchSuccess,
  searchFetchFail,
} from "../state/actions/searchActions";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const handleChange = (event) => {
    navigate(event.target.value);
  };

  const [categories, setCategories] = useState([]);

  const { loading } = useSelector((state) => state.search);
  const { error } = useSelector((state) => state.search);
  const { products } = useSelector((state) => state.search);
  const { pages } = useSelector((state) => state.search);
  const { countProducts } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(searchFetchRequest());
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&order=${order}`
        );

        dispatch(searchFetchSuccess(data));
      } catch (error) {
        dispatch(searchFetchFail(getError(error)));
      }
    };
    fetchData();
  }, [category, error, order, page, price, query]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <Container className="mt-3">
        <Helmet>
          <title>Search Products</title>
        </Helmet>
        <Row>
          <Col md={3}>
            <FormControl>
              <FormLabel
                className="fs-4"
                id="demo-controlled-radio-buttons-group"
              >
                Department
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={`${getFilterUrl({ category: "all" })}`}
                  control={<Radio />}
                  label="All Products"
                />
                {categories.map((c) => (
                  <FormControlLabel
                    key={c}
                    value={`${getFilterUrl({ category: c })}`}
                    control={<Radio />}
                    label={c}
                  />
                ))}
              </RadioGroup>

              <FormLabel
                className="fs-4"
                id="demo-controlled-radio-buttons-group2"
              >
                Price
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group2"
                name="controlled-radio-buttons-group2"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={`${getFilterUrl({ price: "all" })}`}
                  control={<Radio />}
                  label="All Products"
                />
                {prices.map((p) => (
                  <FormControlLabel
                    key={p.value}
                    value={`${getFilterUrl({ price: p.value })}`}
                    control={<Radio />}
                    label={p.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Col>
          <Col md={9}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <Row className="justify-content-between mb-3">
                  <Col md={6}>
                    <div>
                      {countProducts === 0 ? "No" : countProducts} Results
                      {query !== "all" && " : " + query}
                      {category !== "all" && " : " + category}
                      {price !== "all" && " : Price " + price}
                      {query !== "all" ||
                      category !== "all" ||
                      price !== "all" ? (
                        <Button
                          variant="light"
                          onClick={() => navigate("/search")}
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="text-end">
                    Sort by{" "}
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                    </select>
                  </Col>
                </Row>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}

                <Row>
                  {products.map((product) => (
                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>

                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      <Button
                        className={Number(page) === x + 1 ? "text-bold" : ""}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPage;

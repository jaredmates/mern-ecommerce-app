import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Newsletter from "../components/Newsletter";

const HomePage = () => {
  const navigate = useNavigate();

  const shopHandler = () => {
    navigate("/search");
  };

  return (
    <div>
      <Helmet>
        <title>Fear of Monkey</title>
      </Helmet>

      <div className="home-container">
        <h2 className="tagline text-uppercase fst-italic">Fear of Monkey</h2>

        <Button
          variant="contained"
          size="large"
          className="order-btn shop-button"
          onClick={shopHandler}
        >
          Shop
        </Button>
      </div>

      <Container className="mt-3">
        <h1 className="featured-products">Featured Products</h1>

        <Row className="mt-4">
          <Col sm={6} md={4} lg={3} className="mb-4">
            <Card className="bg-light text-black grow">
              <Link to={"/product/blue-premium-shirt"}>
                <Card.Img
                  src="/images/shirts/s1.jpg"
                  alt="Blue Premium Shirt"
                  className="product-image"
                />
                <Card.ImgOverlay>
                  <Card.Title>Shirts</Card.Title>
                </Card.ImgOverlay>
              </Link>
            </Card>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-4">
            <Card className="bg-light text-black grow">
              <Link to={"/product/flower-pants"}>
                <Card.Img
                  src="/images/pants/p1.jpg"
                  alt="Flower Pants"
                  className="product-image"
                />
                <Card.ImgOverlay>
                  <Card.Title>Pants</Card.Title>
                </Card.ImgOverlay>
              </Link>
            </Card>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-4">
            <Card className="bg-light text-black grow">
              <Link to={"/product/red-coat"}>
                <Card.Img
                  src="/images/outerwear/o1.jpg"
                  alt="White Sneakers"
                  className="product-image"
                />
                <Card.ImgOverlay>
                  <Card.Title>Outerwear</Card.Title>
                </Card.ImgOverlay>
              </Link>
            </Card>
          </Col>

          <Col sm={6} md={4} lg={3} className="mb-4">
            <Card className="bg-light text-black grow">
              <Link to={"/product/white-sneakers"}>
                <Card.Img
                  src="/images/shoes/sh1.jpg"
                  alt="Red Coat"
                  className="product-image"
                />
                <Card.ImgOverlay>
                  <Card.Title>Shoes</Card.Title>
                </Card.ImgOverlay>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>

      <Newsletter />
    </div>
  );
};
export default HomePage;

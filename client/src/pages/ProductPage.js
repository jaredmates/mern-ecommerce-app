import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

// Dialog Alert
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useSelector, useDispatch } from "react-redux";
import {
  productFetchFail,
  productFetchRequest,
  productFetchSuccess,
} from "../state/actions/productActions";
import { cartAddItem } from "../state/actions/cartActions";

const ProductScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [open, setOpen] = useState(false);

  const { product, loading, error } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(productFetchRequest());
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch(productFetchSuccess(result.data));
      } catch (err) {
        dispatch(productFetchFail(err.message));
      }
    };
    fetchData();
  }, [slug]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      handleClickOpen();
      return;
    }
    dispatch(cartAddItem({ ...product, quantity }));
    navigate("/cart");
  };

  return loading ? (
    <Container className="mt-3">
      <LoadingBox />
    </Container>
  ) : error ? (
    <Container className="mt-3">
      <MessageBox variant="danger">{error}</MessageBox>
    </Container>
  ) : (
    <div>
      <Container className="mt-3">
        <Row>
          <Col md={3}>
            <img
              className="img-large"
              src={product.image}
              alt={product.name}
            ></img>
          </Col>
          <Col md={3} className="me-5">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Price:</span> ${product.price}
              </ListGroup.Item>

              <ListGroup.Item>
                <span className="fw-bold">Description:</span>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                {/* Alert Dialog */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Sorry. Product is out of stock
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ProductScreen;

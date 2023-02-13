import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBox from "../components/MessageBox";

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
import { cartAddItem, cartRemoveItem } from "../state/actions/cartActions";

const CartScreen = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const {
    cart: { cartItems },
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      handleClickOpen();
      return;
    }
    dispatch(cartAddItem({ ...item, quantity }));
  };

  const removeItemHandler = (item) => {
    dispatch(cartRemoveItem(item));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Container className="mt-3">
        <Helmet>
          <title>Shopping Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/search">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>
                          <Card.Title>{item.name}</Card.Title>
                        </Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>{" "}
                        <span>{item.quantity}</span>{" "}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={checkoutHandler}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
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

export default CartScreen;

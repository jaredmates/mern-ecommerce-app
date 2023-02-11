import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import getError from "../utils/getError.js";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import StripeCheckout from "../components/StripeCheckout";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { useSelector, useDispatch } from "react-redux";
import {
  payFail,
  payRequest,
  payReset,
  paySuccess,
  orderFetchFail,
  orderFetchRequest,
  orderFetchSuccess,
  deliverRequest,
  deliverSuccess,
  deliverFail,
  deliverReset,
} from "../state/actions/orderActions";

const OrderPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [stripe, setStripe] = useState(null);
  const [paypal, setPaypal] = useState(null);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { order } = useSelector((state) => state.order);
  const { successPay } = useSelector((state) => state.order);
  const { loadingPay } = useSelector((state) => state.order);
  const { error } = useSelector((state) => state.order);
  const { loading } = useSelector((state) => state.order);
  const { loadingDeliver } = useSelector((state) => state.order);
  const { successDeliver } = useSelector((state) => state.order);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch(payRequest());
        const { data } = await axios.put(`/orders/${order._id}/pay`, details, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch(paySuccess(data));
        toast.success("Order is paid");
      } catch (err) {
        dispatch(payFail(err));
        toast.error(getError(err));
      }
    });
  }

  async function handleSuccessPayment(result, actions) {
    try {
      dispatch(payRequest());
      const { data } = await axios.put(`/orders/${order._id}/pay`, result, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch(paySuccess(data));
      toast.success("Order is paid");
    } catch (err) {
      dispatch(payFail(err));
      toast.error(getError(err));
    }
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(orderFetchRequest());
        const { data } = await axios.get(`/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch(orderFetchSuccess(data));
      } catch (err) {
        dispatch(orderFetchFail(err));
      }
    };

    if (!userInfo) {
      return navigate("/signin");
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch(payReset());
      }

      if (successDeliver) {
        dispatch(deliverReset());
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        setPaypal(true);
      };

      const addStripeScript = async () => {
        const { data: clientId } = await axios.get("/stripe/key");
        const stripeObj = await loadStripe(clientId);
        setStripe(stripeObj);
      };

      if (order.paymentMethod === "PayPal") {
        if (!paypal) {
          loadPaypalScript();
        }
      }

      if (order.paymentMethod === "Stripe") {
        if (!stripe) {
          addStripeScript();
        }
      }
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch(deliverRequest());
      const { data } = await axios.put(
        `/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch(deliverSuccess(data));
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(getError(err));
      dispatch(deliverFail());
    }
  }

  return loading ? (
    <Container className="mt-3">
      <LoadingBox></LoadingBox>
    </Container>
  ) : error ? (
    <Container className="mt-3">
      <MessageBox variant="danger">{error}</MessageBox>
    </Container>
  ) : (
    <div>
      <Container className="mt-3">
        <Helmet>
          <title>Order {orderId}</title>
        </Helmet>

        <div className="d-flex justify-content-between align-items-center">
          <h1 className="my-3">Order {orderId}</h1>

          {order.isPaid && (
            <Link
              className="font-weight-bold"
              style={{ textDecoration: "none" }}
              to={`/search`}
            >
              Continue Shopping
            </Link>
          )}
        </div>

        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </Card.Text>

                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {order.paymentMethod}
                </Card.Text>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail mb-3"
                          ></img>{" "}
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/product/${item.slug}`}
                          >
                            <Card.Title>{item.name}</Card.Title>
                          </Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && paypal && (
                    <ListGroup.Item>
                      {isPending ? (
                        <LoadingBox />
                      ) : (
                        <div className="paypal-btn-container">
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                    </ListGroup.Item>
                  )}

                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      <div className="d-grid">
                        <Button type="button" onClick={deliverOrderHandler}>
                          Deliver Order
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}

                  {!order.isPaid && stripe && (
                    <ListGroup.Item>
                      {isPending ? (
                        <LoadingBox />
                      ) : (
                        <StripeCheckout
                          stripe={stripe}
                          orderId={order._id}
                          handleSuccessPayment={handleSuccessPayment}
                        />
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderPage;

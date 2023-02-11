import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TopInfo = () => {
  return (
    <div className="header-info bg-dark text-light p-2">
      <Container>
        <Row>
          <Col md="4" className="text-center d-none d-md-block">
            <i className="fa fa-truck" />
            <span className="ps-2">Free Shipping</span>
          </Col>
          <Col md="4" className="text-center d-none d-md-block">
            <i className="fa fa-credit-card" />
            <span className="ps-2">Payment Methods</span>
          </Col>
          <Col md="4" className="text-center d-none d-md-block">
            <i className="fa fa-phone" />
            <span className="ps-2">Call us 951-999-9999</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopInfo;

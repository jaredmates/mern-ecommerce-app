import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-muted mt-3"
    >
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Fear of Monkey
              </h6>
              <p>
                An upscale clothing store to satisfy all your fashion needs.
              </p>
            </MDBCol>

            <MDBCol
              md="2"
              lg="2"
              xl="2"
              className="mx-auto mb-4 d-flex flex-column gap-2"
            >
              <h6 className="text-uppercase fw-bold mb-3">Products</h6>

              <p>
                <Link to="/search?category=Shirts" className="text-reset">
                  Shirts
                </Link>
              </p>

              <p>
                <Link to="/search?category=Pants" className="text-reset">
                  Pants
                </Link>
              </p>

              <p>
                <Link to="/search?category=Outerwear" className="text-reset">
                  Outerwear
                </Link>
              </p>

              <p>
                <Link to="/search?category=Shoes" className="text-reset">
                  Shoes
                </Link>
              </p>
            </MDBCol>

            <MDBCol
              md="3"
              lg="2"
              xl="2"
              className="mx-auto mb-4 d-flex flex-column gap-2"
            >
              <h6 className="text-uppercase fw-bold mb-3">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol
              md="4"
              lg="3"
              xl="3"
              className="mx-auto mb-md-0 mb-4 d-flex flex-column gap-2"
            >
              <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                San Diego, CA 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-2" />
                fearofmonkey@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-2" />+ 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-2" />+ 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:{" "}
        <a className="text-reset fw-bold" href="#!">
          fearofmonkey.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;

import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { IconContext } from "react-icons";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const SignupProvider = () => {
  return (
    <Card.Body className="col-md-6 ms-5 ">
      <ListGroup variant="dark" className="">
        <ListGroup.Item className="p-3">
          <Link
            to="/error"
            className="d-flex gap-2 align-items-center text-decoration-none"
          >
            <IconContext.Provider value={{ size: "2em" }}>
              <FcGoogle />
            </IconContext.Provider>
            <Card.Text className="fs-5">Login with Google</Card.Text>
          </Link>
        </ListGroup.Item>

        <ListGroup.Item className="p-3">
          <Link
            to="/error"
            className="d-flex gap-2 align-items-center text-decoration-none"
          >
            <IconContext.Provider value={{ size: "2em" }}>
              <GrFacebook />
            </IconContext.Provider>

            <Card.Text className="fs-5">Login with Facebook</Card.Text>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  );
};

export default SignupProvider;

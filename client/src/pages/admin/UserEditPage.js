import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import getError from "../../utils/getError.js";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { useSelector, useDispatch } from "react-redux";
import {
  userEditFetchRequest,
  userEditFetchSuccess,
  userEditFetchFail,
  userEditUpdateRequest,
  userEditUpdateSuccess,
  userEditUpdateFail,
} from "../../state/actions/userEditActions";

const UserEditPage = () => {
  const { loading } = useSelector((state) => state.userEdit);
  const { error } = useSelector((state) => state.userEdit);
  const { loadingUpdate } = useSelector((state) => state.userEdit);

  const { userInfo } = useSelector((state) => state.user);

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(userEditFetchRequest());
        const { data } = await axios.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch(userEditFetchSuccess());
      } catch (err) {
        dispatch(userEditFetchFail());
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userEditUpdateRequest());
      await axios.put(
        `/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch(userEditUpdateSuccess());
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(getError(error));
      dispatch(userEditUpdateFail());
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit User ${userId}</title>
      </Helmet>
      <h1>Edit User {userId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isAdmin"
            label="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
};

export default UserEditPage;

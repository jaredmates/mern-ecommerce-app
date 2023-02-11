import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import getError from "../../utils/getError.js";
import Container from "react-bootstrap/Container";

// Dialog Alert
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSelector, useDispatch } from "react-redux";
import {
  userListFetchRequest,
  userListFetchSuccess,
  userListFetchFail,
  userListDeleteRequest,
  userListDeleteSuccess,
  userListDeleteFail,
  userListDeleteReset,
} from "../../state/actions/userListActions";

const UserListPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { loading } = useSelector((state) => state.userList);
  const { error } = useSelector((state) => state.userList);
  const { users } = useSelector((state) => state.userList);
  const { loadingDelete } = useSelector((state) => state.userList);
  const { successDelete } = useSelector((state) => state.userList);

  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(userListFetchRequest());
        const { data } = await axios.get(`/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch(userListFetchSuccess(data));
      } catch (err) {
        dispatch(userListFetchFail(getError(err)));
      }
    };
    if (successDelete) {
      dispatch(userListDeleteReset());
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async (user) => {
    try {
      dispatch(userListDeleteRequest());
      await axios.delete(`/users/${user._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("user deleted successfully");
      dispatch(userListDeleteSuccess());
    } catch (error) {
      toast.error(getError(error));
      dispatch(userListDeleteFail());
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Helmet>
          <title>Users</title>
        </Helmet>
        <h1>Users</h1>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/user/${user._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleClickOpen}
                    >
                      Delete
                    </Button>
                    {/* Alert Dialog */}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Delete this User?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this user?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button
                          onClick={() => {
                            deleteHandler(user);
                            handleClose();
                          }}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
};

export default UserListPage;

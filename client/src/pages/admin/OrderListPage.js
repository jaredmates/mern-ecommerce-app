import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  orderListFetchRequest,
  orderListFetchSuccess,
  orderListFetchFail,
  deleteRequest,
  deleteSuccess,
  deleteFail,
  deleteReset,
} from "../../state/actions/orderListActions";

const OrderListPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  const { loading } = useSelector((state) => state.orderList);
  const { error } = useSelector((state) => state.orderList);
  const { orders } = useSelector((state) => state.orderList);
  const { loadingDelete } = useSelector((state) => state.orderList);
  const { successDelete } = useSelector((state) => state.orderList);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(orderListFetchRequest());
        const { data } = await axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch(orderListFetchSuccess(data));
      } catch (err) {
        dispatch(orderListFetchFail(getError(err)));
      }
    };
    if (successDelete) {
      dispatch(deleteReset());
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

  const deleteHandler = async (order) => {
    try {
      dispatch(deleteRequest());
      await axios.delete(`/api/orders/${order._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("order deleted successfully");
      dispatch(deleteSuccess());
    } catch (error) {
      toast.error(getError(error));
      dispatch(deleteFail());
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Helmet>
          <title>Orders</title>
        </Helmet>
        <h1>Orders</h1>
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
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : "DELETED USER"}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
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
                        {"Delete this Order?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this order?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button
                          onClick={() => {
                            deleteHandler(order);
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

export default OrderListPage;

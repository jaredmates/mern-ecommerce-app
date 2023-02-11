import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import getError from "../../utils/getError.js";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  productListFetchRequest,
  productListFetchSuccess,
  productListFetchFail,
  productListCreateRequest,
  productListCreateSuccess,
  productListCreateFail,
  productListDeleteRequest,
  productListDeleteSuccess,
  productListDeleteFail,
  productListDeleteReset,
} from "../../state/actions/productListActions";

const ProductListPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.productList);
  const { error } = useSelector((state) => state.productList);
  const { loadingCreate } = useSelector((state) => state.productList);
  const { loadingDelete } = useSelector((state) => state.productList);
  const { successDelete } = useSelector((state) => state.productList);
  const { products } = useSelector((state) => state.productList);
  const { pages } = useSelector((state) => state.productList);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(productListFetchRequest());
        const { data } = await axios.get(`/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch(productListFetchSuccess(data));
      } catch (err) {
        dispatch(productListFetchFail(getError(err)));
      }
    };
    if (successDelete) {
      dispatch(productListDeleteReset());
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createHandler = async () => {
    try {
      dispatch(productListCreateRequest());
      const { data } = await axios.post(
        "/products",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success("product created successfully");
      dispatch(productListCreateSuccess());
      navigate(`/admin/product/${data.product._id}`);
    } catch (err) {
      toast.error(getError(error));
      dispatch(productListCreateFail());
    }
  };

  const deleteHandler = async (product) => {
    try {
      dispatch(productListDeleteRequest());
      await axios.delete(`/products/${product._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("product deleted successfully");
      dispatch(productListDeleteSuccess());
    } catch (error) {
      toast.error(getError(error));
      dispatch(productListDeleteFail());
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Helmet>
          <title>Products</title>
        </Helmet>
        <Row>
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="col text-end">
            <div>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  handleClickOpen();
                  setCreate(true);
                }}
              >
                Create Product
              </Button>
            </div>
          </Col>
        </Row>

        {loadingCreate && <LoadingBox></LoadingBox>}
        {loadingDelete && <LoadingBox></LoadingBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          navigate(`/admin/product/${product._id}`)
                        }
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => {
                          handleClickOpen();
                          setCreate(false);
                        }}
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
                          {create
                            ? "Create new Product?"
                            : "Delete this Product?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {create
                              ? "Are you sure you want to create a new product?"
                              : "Are you sure you want to delete this product?"}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>

                          {create ? (
                            <Button
                              onClick={() => {
                                createHandler();
                                handleClose();
                              }}
                              autoFocus
                            >
                              Agree
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                deleteHandler(product);
                                handleClose();
                              }}
                              autoFocus
                            >
                              Agree
                            </Button>
                          )}
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                  key={x + 1}
                  to={`/admin/products?page=${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductListPage;

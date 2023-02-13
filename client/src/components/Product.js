import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

// Dialog Alert
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { cartAddItem } from "../state/actions/cartActions";

const Product = (props) => {
  const { product } = props;

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

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      handleClickOpen();
      return;
    }

    dispatch(cartAddItem({ ...item, quantity }));
  };

  return (
    <Card className="root">
      <Link to={`/product/${product.slug}`}>
        <CardMedia className="media" title={product.name}>
          {" "}
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </CardMedia>
      </Link>

      <CardContent>
        <div className="cardContent">
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
          component="p"
        />
      </CardContent>

      <CardActions disableSpacing className="cardActions">
        {product.countInStock === 0 ? (
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            className="disabled-button"
            disabled
          >
            Out of stock
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            className="add-to-cart-button"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </CardActions>

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
    </Card>
  );
};
export default Product;

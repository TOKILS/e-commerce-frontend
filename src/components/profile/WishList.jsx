"use strict";
import React from "react";
import Navbar from "../Navbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import "./profile.css";
// import { styled } from '@mui/material/styles';
import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useContext, forwardRef } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { AuthContext } from "../../context/authentication";
import superagent from "superagent";
import Button from "@mui/material/Button";
import { updateCart } from "../../store/cart/cart";
import { DeleteIcon } from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

function WishList(props) {
  const context = useContext(AuthContext);
  const [wish, setWish] = useState([]);
  useEffect(() => {
    // my id is 15

    if (context.loggedIn) {
      superagent
        .get(
          `https://mid-project-01.herokuapp.com/api/v3/wishlistProducts/${context.user.id}`
        )
        .then((res) => setWish(res.body));
    }
  }, [, context.loggedIn]);
  console.log(">>>wish", wish);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenDelete(false);
  };

  const dispatch = useDispatch();

  const addToCart = (item) => {
    if (context.loggedIn) {
      handleClick();
      superagent
        .post(`https://mid-project-01.herokuapp.com/api/v2/Cart`)
        .send({
          ProductID: item.ProductID.id,
          UserID: context.user.id,
          ColorID: item.ColorID.id,
          SizeID: item.SizeID.id,
        })
        .set("Authorization", "Bearer " + context.token)
        .then((res) => {
          dispatch(updateCart());
        });
    }
  };

  function handleDelete(id) {
    // alert(id, 'iii')
    superagent
      .del(`https://mid-project-01.herokuapp.com/api/v2/Wishlist/${id}`)
      .set("Authorization", "Bearer " + context.token)
      .then((res) =>
        setWish(
          wish.filter((product) => {
            return product.id !== id;
          })
        )
      );

    handleClickDelete();
  }
  return (
    <>
      <div>
        <h2>Wishlist</h2>
        {wish.length ? (
          wish.map((item) => {
            return (
              <Paper
                sx={{ p: 2, boxShadow: 3, margin: "7.5px auto", flexGrow: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src={item.image[0].Image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="h4" component="div">
                          {/* {item.ProductID.id} */}
                          {item.ProductID.Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <ProductColor color={item.ColorID.Code} />
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {item.ProductID.Description}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{ cursor: "pointer" }}
                          variant="subtitle1"
                        ></Typography>{" "}
                        <Typography
                          sx={{ cursor: "pointer" }}
                          variant="subtitle1"
                        >
                          <Button
                            sx={{ marginRight: "20px" }}
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            variant="outlined"
                            color="error"
                          >
                            Remove
                          </Button>
                          <Button
                            onClick={() => {
                              addToCart(item);
                            }}
                            variant="outlined"
                            color="success"
                          >
                            Add To Cart
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="div">
                        Price:{item.ProductID.Price}$
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        ) : (
          <p style={{ fontSize: "20px" }}>Your wish list is empty</p>
        )}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ marginLeft: "450px", marginBottom: "330px" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <h4> Added To The Cart!</h4>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDelete}
        autoHideDuration={3000}
        onClose={handleClose}
        style={{ marginLeft: "450px", marginBottom: "330px" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <h4>Item Deleted ...</h4>
        </Alert>
      </Snackbar>
    </>
  );
}

export default WishList;

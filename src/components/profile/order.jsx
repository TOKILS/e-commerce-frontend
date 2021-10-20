"use strict";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useContext, forwardRef } from "react";
import { AuthContext } from "../../context/authentication";
import superagent from "superagent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";

// we need to make a request to delete the order for the user who logged in .....laith

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

function Order() {
  const [order, setorder] = useState([]);
  const context = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (context.loggedIn) {
      superagent
        .get(
          `https://mid-project-01.herokuapp.com/api/v3/wishlistProducts/${context.user.id}`
        )
        .then((res) => setorder(res.body));
    }
  }, []);
  console.log(order, "order");
  const deleteOrder = (id) => {
    superagent
      .del(`https://mid-project-01.herokuapp.com/api/v2/Order/${id}`)
      .set("Authorization", "Bearer " + context.token)
      .then((res) =>
        setorder(
          order.filter((order) => {
            return order.id !== id;
          })
        )
      );
  };
  return (
    <>
      <h2>Your Orders</h2>

      {order.length > 0 ? (
        order.map((item) => {
          return (
            // AdressID: 0
            // Quantity: 0
            // State: ""
            // TotalPrice: 0
            // UserID: 75
            // createdAt: "2021-10-18T20:04:20.241Z"
            // id: 30

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
                            deleteOrder(item.id);
                          }}
                          variant="outlined"
                          color="error"
                        >
                          Remove
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
        <p style={{ fontSize: "20px" }}>
          You currently have no orders in action
        </p>
      )}
    </>
  );
}

export default Order;

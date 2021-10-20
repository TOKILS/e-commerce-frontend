import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { update } from "../../../store/product/product";
import { useContext } from "react";
import { AuthContext } from "../../../context/authentication";
import { When } from "react-if";
import superagent from "superagent";
import { updateCart } from "../../../store/cart/cart";
import cookie from "react-cookies";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Product = ({ product, handleClick }) => {
  const context = useContext(AuthContext);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addToCart = () => {
    if (context.loggedIn) {
      superagent
        .post(`https://mid-project-01.herokuapp.com/api/v2/Cart`)
        .send({
          ProductID: product.id,
          UserID: context.user.id,
          ColorID: product.color[0].id,
          SizeID: product.color[0].size[0].id,
        })
        .set("Authorization", "Bearer " + context.token)
        .then((res) => {
          dispatch(updateCart());
          handleClick();
        });
    } else setOpen(true);
  };
  const addToWish = () => {
    if (context.loggedIn) {
      superagent
        .post(`https://mid-project-01.herokuapp.com/api/v2/Wishlist`)
        .send({
          ProductID: product.id,
          UserID: context.user.id,
          ColorID: product.color[0].id,
          SizeID: product.color[0].size[0].id,
        })
        .set("Authorization", "Bearer " + context.token)
        .then((res) => {
          handleClick();
        });
    } else setOpen(true);
  };

  return (
    <>
      <Container>
        <Circle />
        <Image src={product.color[0].image[0].Image} />
        <Info>
          <Icon>
            <ShoppingCartOutlined onClick={addToCart} />
          </Icon>
          <Icon
            onClick={() => {
              dispatch(update(product));
              localStorage.setItem("product", JSON.stringify(product));
            }}
          >
            <Link exact to="/Product">
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderOutlined onClick={addToWish} />
          </Icon>
        </Info>
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <h4>You Need To SIGN IN ...</h4>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Product;

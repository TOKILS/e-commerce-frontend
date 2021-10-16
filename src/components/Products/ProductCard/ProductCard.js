import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { update } from "../../../store/product/product";
import { useContext } from "react";
import { AuthContext } from "../../../context/authentication";
import { When } from "react-if";
import superagent from "superagent";
import { updateCart } from "../../../store/cart/cart";

import { addOneItemToCart, handleItemToCart } from "../../../controllers/cart";
import allActions from "../../../store/cart/actions/all_actions";

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

const Product = ({ product, type }) => {
  const context = useContext(AuthContext);
  const { id } = product;
  const cart = useSelector((state) => state.cart_store);
  const products = useSelector((state) => state.cart_store.products);
  const [open, setOpen] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const dispatch = useDispatch();


  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseStock = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOutOfStock(false);
  };

  const handleAddToCart = () => {
    // if (user.hasOwnProperty('role')) {
    const isInCart = products.filter((p) => p.id === product.id);
    if (isInCart.length === 1) {
      addOneItemToCart(cart.id, product.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      handleItemToCart(cart.id, product.id, 1)
        .then((response) => {
          if (response.msg === "Product has no more stock available") {
            setOutOfStock(true);
            console.log(response);
          } else {
            console.log(response);
          }
          dispatch(allActions.getCart());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // } else {
    //   dispatch(allActions.postCartGuest(product))
    // }
  };

  return (
    <Container>
      <Circle />
      <Image src={product.color[0].image[0].Image} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={handleAddToCart} />
        </Icon>
        <Icon>
          <Link exact to="/Product">
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;

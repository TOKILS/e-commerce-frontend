import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
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
    console.log(product);
    const { id, price, name } = product;
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
        dispatch(allActions.postCartGuest(product))
    };

    return (
        <>
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
        </>
    );
};

export default Product;
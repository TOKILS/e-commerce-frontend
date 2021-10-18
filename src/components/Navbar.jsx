import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import { When } from "react-if";

import superagent from "superagent";
import { useSelector } from "react-redux";
const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const cart = useSelector((state) => state.cart);

  const context = useContext(AuthContext);
  const [itemsInCart, setitemsInCart] = useState(0);
  useEffect(() => {
    if (context.loggedIn) {
      superagent
        .get(
          `https://mid-project-01.herokuapp.com/api/v3/cartProductsInfo/${context.user.id}`
        )
        .then((res) => {
          setitemsInCart(res.body.totalItems);
        });
    }
  }, [context.loggedIn, cart]);
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>Fashionable</Logo>
          </Link>
        </Center>
        <Right>
          <When condition={!context.loggedIn}>
            <MenuItem>
              <Link to="/Register">Register</Link>
            </MenuItem>
          </When>
          <When condition={!context.loggedIn}>
            <MenuItem>
              <Link to="/Login">SIGN IN</Link>
            </MenuItem>
          </When>
          <When condition={context.loggedIn}>
            <MenuItem>
              <Link to="/" onClick={context.logout}>
                {" "}
                Logout{" "}
              </Link>
            </MenuItem>
          </When>
          <MenuItem>
            <Link to="/Cart">
              <Badge badgeContent={itemsInCart} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );

};

export default Navbar;

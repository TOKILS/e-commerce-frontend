import { Add, Remove } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/authentication";
import superagent from "superagent";
import { Typography } from "@material-ui/core";
import CartItem from "../components/CartItem";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [cartInfo, setCartInfo] = useState({
    totalPrice: 0,
    totalItems: 0,
  });
  const [wishListInfo, setWishListInfo] = useState({
    totalPrice: 0,
    totalItems: 0,
  });
  const [cartItems, setCartItems] = useState([]);
  const [isEmpty, setisEmpty] = useState(true);
  const context = useContext(AuthContext);

  const UpdateItems = () => {
    superagent
      .get(
        "https://mid-project-01.herokuapp.com/api/v3/wishlistProductsInfo/" +
          context.user.id
      )
      .then((results) => {
        setWishListInfo(results.body);
      });
    superagent
      .get(
        "https://mid-project-01.herokuapp.com/api/v3/cartProducts/" +
          context.user.id
      )
      .then(async (results) => {
        let res = await Promise.all(
          results.body.map(async (p) => {
            return {
              ...p,
              img: await superagent.get(
                "https://mid-project-01.herokuapp.com/api/v3/image/" +
                  p.ColorID.id
              ),
            };
          })
        );

        setCartItems(res.map((ele) => ({ ...ele, img: ele.img.body.Image })));
      });
  };
  const UpdateSummery = () => {
    superagent
      .get(
        "https://mid-project-01.herokuapp.com/api/v3/cartProductsInfo/" +
          context.user.id
      )
      .then((results) => {
        setCartInfo(results.body);
      });
  };
  useEffect(() => {
    if (context.loggedIn) {
      console.log(context.user);
      UpdateItems();
      UpdateSummery();
    }
  }, []);

  return (
    <Container>
      <Announcement />

      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link to="/">CONTINUE SHOPPING</Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartInfo.totalItems})</TopText>
            <TopText>Your Wishlist ({wishListInfo.totalItems})</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          {cartInfo.totalItems ? (
            <Info>
              {cartItems.map((item) => {
                return (
                  <>
                    <CartItem
                      UpdateItems={UpdateItems}
                      UpdateSummery={UpdateSummery}
                      item={item}
                    />
                    <Hr />
                  </>
                );
              })}
            </Info>
          ) : (
            <img
              style={{ margin: "0px auto 0px auto" }}
              src="https://www.hindarthouse.com/uploads/emptycart.png"
            />
          )}
          {cartInfo.totalItems > 0 ? (
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cartInfo.totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 15.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  $ {cartInfo.totalPrice + 10}
                </SummaryItemPrice>
              </SummaryItem>
              <Link to="/shipping">
                <Button>CHECKOUT NOW</Button>
              </Link>
            </Summary>
          ) : (
            []
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

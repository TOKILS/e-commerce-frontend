import React, { useContext, useEffect, forwardRef, useState } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import superagent from "superagent";
import { AuthContext } from "../../context/authentication";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const BillingContainer = styled.div`
  width: 60%;
  display: inline-block;
  border: 0.5px solid teal;
  border-radius: 10px;
  margin: 30px 40px 40px 90px;
`;

const Title = styled.h1`
  font-weight: 180;
  margin: 10px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputDiv = styled.div`
  width: 90%;
  margin: 10px;
`;

const Lable = styled.label`
  flex: 1;
  width: 400px;
  padding: 10px;
`;

const Input = styled.input`
  flex: 1;
  width: 400px;
  padding: 10px;
  border: 0.5px solid teal;
`;

const DescriptionP = styled.p`
  color: gray;
  margin: 5px 125px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 7px;
`;

// ------------------------
const Summary = styled.div`
  display: inline-block;
  margin: 50px 15px 15px 15px;
  flex: 1;
  float: right;
  border: 0.5px solid teal;
  width: 300px;
  border-radius: 10px;
  padding: 20px;
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

// ---------------------

const Select = styled.select`
  width: 50px;
  height: 25px;
  text-align: center;
  border-radius: 7px;
`;

const Option = styled.option`
  margin: 5px;
`;

function BillingInfo() {
  let history = useHistory();
  const [cartInfo, setCartInfo] = useState({
    totalPrice: 0,
    totalItems: 0,
  });
  const context = useContext(AuthContext);
  const [addressId, setAddressId] = useState(0);
  const [cartResponse, setCartResponse] = useState({});

  useEffect(() => {
    if (context.loggedIn) {
      superagent
        .get(
          "https://mid-project-01.herokuapp.com/api/v3/cartProductsInfo/" +
            context.user.id
        )
        .then((results) => {
          setCartInfo(results.body);
        });
    }
  }, []);

  async function handelSubmit(event) {
    event.preventDefault();
    setOpenLoading(true);

    if (context.loggedIn) {
      let userAddress = await superagent
        .get(
          // get the user address from the db
          `https://mid-project-01.herokuapp.com/api/v3/address/${context.user.id}`
        )
        .catch((e) => {
          console.log(e);
        });

      if (Object.keys(userAddress.body).length !== 0) {
        setAddressId(userAddress.body[0].id);
      }

      let cartInfo = await superagent
        .get(
          // get total price and total number of items from the cart
          `https://mid-project-01.herokuapp.com/api/v3/cartProductsInfo/${context.user.id}`
        )
        .catch((e) => console.log(e));
      setCartResponse(cartInfo);

      let newOrder = await superagent // add new order
        .post("https://mid-project-01.herokuapp.com/api/v2/Order")
        .send({
          UserID: context.user.id,
          AdressID: addressId,
          TotalPrice: cartResponse.totalPrice,
          Quantity: cartResponse.totalItems,
          State: "",
        })
        .set("Authorization", "Bearer " + context.token)
        .catch((e) => console.log(e));

      let cartProducts = await superagent
        .get(
          // get the user products from the cart
          `https://mid-project-01.herokuapp.com/api/v3/cartProducts/${context.user.id}`
        )
        .catch((e) => console.log(e));

      for (let i = 0; i < cartProducts.body.length; i++) {
        await superagent
          .post(
            // Add new order detail
            "https://mid-project-01.herokuapp.com/api/v2/OrderDetails"
          )
          .send({
            ProductID: cartProducts.body[i].ProductID.id,
            UserID: context.user.id,
            ColorID: cartProducts.body[i].ColorID.id,
            SizeID: cartProducts.body[i].SizeID.id,
            OrderID: newOrder.body.id,
            Quantity: cartProducts.body[i].Quantity,
          })
          .set("Authorization", "Bearer " + context.token)
          .catch((e) => console.log(e));
        setTimeout(() => {}, 100);
      }
      await superagent
        .delete(
          // delete all cart Items
          `https://mid-project-01.herokuapp.com/api/v3/cart/${context.user.id}`
        )
        .set("Authorization", "Bearer " + context.token)
        .catch((e) => console.log(e));
      handleClick();
      setTimeout(() => {
        history.push("/");
      }, 5000);
    }
  }

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    console.log("open", open);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const [openLoading, setOpenLoading] = React.useState(false);
  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleToggleLoading = () => {
    setOpenLoading(!openLoading);
  };
  return (
    <>
      <Navbar />
      <BillingContainer>
        <Title>Billing Information</Title>
        <InputDiv style={{ textAlign: "center" }}>
          <img
            style={{ marginRight: "10px" }}
            src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/visa-curved-32px.png"
            alt="Visa"
          />
          <img
            style={{ marginRight: "10px" }}
            src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/mastercard-curved-32px.png"
            alt="MasterCard"
          />
          <img
            style={{ marginRight: "10px" }}
            src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/american-express-curved-32px.png"
            alt="American Ex"
          />
          <img
            style={{ marginRight: "10px" }}
            src="https://www.uxfordev.com/demo/1.0.6/assets/images/payment-icon-set/icons/maestro-curved-32px.png"
            alt="Maestro"
          />
        </InputDiv>
        <Form onSubmit={handelSubmit}>
          <InputDiv>
            <Lable for="cardName">Name on Card*</Lable>
            <Input
              id="cardName"
              placeholder="Your Name"
              type="text"
              name="cardName"
              required
            />
            <DescriptionP>As it appears on the card</DescriptionP>
          </InputDiv>
          <InputDiv>
            <Lable for="ccn">Card Number*</Lable>
            <Input
              id="ccn"
              placeholder="••••  ••••  ••••  ••••"
              type="tel"
              pattern="[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}"
              maxlength="16"
              name="cardNumber"
              required
            />
            <DescriptionP>
              The 16 digits on the front of your credit card.
            </DescriptionP>
          </InputDiv>
          <InputDiv>
            <Lable>Expiration Date*</Lable>
            <Select required>
              <Option>01</Option>
              <Option>02</Option>
              <Option>03</Option>
              <Option>04</Option>
              <Option>05</Option>
              <Option>06</Option>
              <Option>07</Option>
              <Option>08</Option>
              <Option>09</Option>
              <Option>10</Option>
              <Option>11</Option>
              <Option>12</Option>
            </Select>
            <span> / </span>
            <Select required>
              <Option>2021</Option>
              <Option>2022</Option>
              <Option>2023</Option>
              <Option>2024</Option>
              <Option>2025</Option>
              <Option>2026</Option>
              <Option>2027</Option>
            </Select>
            <DescriptionP>
              The date your credit card expires. Find this on the front of your
              credit card.
            </DescriptionP>
          </InputDiv>
          <InputDiv>
            <Lable for="cvc">Security Code*</Lable>
            <Input
              id="cvc"
              placeholder="CVC"
              type="tel"
              name="cvc"
              pattern="[0-9]{3}"
              required
            />
            <DescriptionP>
              The last 3 digits displayed on the back of your credit card.
            </DescriptionP>
          </InputDiv>
          <InputDiv style={{ textAlign: "center" }}>
            <Button type="submit">Make Payment</Button>
          </InputDiv>
        </Form>
      </BillingContainer>

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
          <SummaryItemPrice>$ {cartInfo.totalPrice + 10}</SummaryItemPrice>
        </SummaryItem>
      </Summary>
      <Stack
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Snackbar
          open={open}
          onClose={handleClose}
          style={{ marginLeft: "450px", marginBottom: "330px"}}
          autoHideDuration={3500} 
        >
          <Alert
            onClose={handleClose}
            // severity="success"
            sx={{ width: "100%" }}
          >
              Payment Successfully , Thank You {<br />}
              You can Find your order in your profile
          </Alert>
        </Snackbar>
      </Stack>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleCloseLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

export default BillingInfo;

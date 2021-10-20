import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import superagent from "superagent";
import { AuthContext } from "../../context/authentication";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import { CardContent, Typography } from "@material-ui/core";

const ShippingInfo = styled.div`
  width: 60%;
  display: inline-block;
  border: 0.5px solid teal;
  margin: 30px 40px 40px 90px;
  border-radius: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: 10px;
  text-align: center;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InputDiv = styled.div`
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  width: 290px;
  margin: 10px auto 10px 45px;
  padding: 10px;
  text-align: center;
  border: 1px solid teal;
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
// ----------------------------
const Summary = styled.div`
  display: inline-block;
  margin: 0px 15px 15px 15px;
  flex: 1;
  float: right;
  border: 0.5px solid teal;
  width: 300px;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 180;
  text-align: center;
  margin: 10px 0px 10px 0px;
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
// -----------------------

function ShippongInfo() {
  const [cartInfo, setCartInfo] = useState({
    totalPrice: 0,
    totalItems: 0,
  });
  const context = useContext(AuthContext);
  const [bodystate, setbodystate] = useState({ UserID: context.user.id });
  const [address, setAddress] = useState({});
  let history = useHistory();

  useEffect(() => {
    console.log("outside login");
    if (context.loggedIn) {
      console.log("inside login");

      superagent
        .get(
          "https://mid-project-01.herokuapp.com/api/v3/cartProductsInfo/" +
            context.user.id
        )
        .then((results) => {
          setCartInfo(results.body);
        });
      superagent
        .get(
          `https://mid-project-01.herokuapp.com/api/v3/address/${context.user.id}`
        )
        .then((response) => {
          console.log("inside");
          console.log("address", response.body);
          if (Object.keys(response.body).length !== 0) {
            console.log("already have an address ");
            setAddress(response.body[0]);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [context.loggegIn]);

  function handelSubmit(event) {
    event.preventDefault();
    console.log(bodystate);
    if (Object.keys(address).length === 0) {
      superagent
        .post("https://mid-project-01.herokuapp.com/api/v2/Address")
        .send({ ...bodystate, UserID: context.user.id })
        .set("Authorization", "Bearer " + context.token)
        .then((results) => {
          console.log(results.body);
          history.push("/billing");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  console.log(address);
  return (
    <>
      <Navbar />
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
      <br style={{ clear: "both" }} />
      <Summary>
        <SummaryTitle>SHIPPING & DELIVERY</SummaryTitle>
        <SummaryItemText>
          Orders are delivered on business days (Sunday-Thuersday) excluding public
          holidays.
        </SummaryItemText>
      </Summary>
      <div style={{ marginTop: "-300px" }}>
        <ShippingInfo>
          <SummaryTitle>Shipping Info</SummaryTitle>
          {Object.keys(address).length !== 0 ? (
            <h3 style={{ margin: "10px", textAlign: "center" }}>
              <Title>You already have this address :</Title>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Address Line: {address.Country} - {address.Address1} -{" "}
                  {address.Province}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Company: {address.Company}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  PostalCode: {address.PostalCode}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Phone: {address.Phone}
                </Typography>
              </CardContent>
              <Button
                onClick={() => {
                  setAddress({});
                }}
              >
                Add new Address
              </Button>
              <Button
                onClick={() => {
                  history.push("/billing");
                }}
              >
                Confirm and Continue To Billing
              </Button>
            </h3>
          ) : (
            <Form onSubmit={handelSubmit}>
              <InputDiv>
                <Input
                  placeholder="First Name*"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, FirstName: e.target.value });
                  }}
                  type="text"
                  name="firstName"
                  required
                />
                <Input
                  placeholder="Last Name*"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, LastName: e.target.value });
                  }}
                  type="text"
                  name="lastName"
                  required
                />

                <Input
                  placeholder="Company"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, Company: e.target.value });
                  }}
                  type="text"
                  name="company"
                />
                <Input
                  placeholder="Postal Code*"
                  onChange={(e) => {
                    setbodystate({
                      ...bodystate,
                      PostalCode: Number(e.target.value),
                    });
                  }}
                  type="tel"
                  pattern="[0-9]{5}"
                  name="postalCode"
                  required
                />
                <Input
                  placeholder="Address Line 1 *"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, Address1: e.target.value });
                  }}
                  type="text"
                  name="addressLine"
                  required
                />
                <Input
                  placeholder="Address Line 2"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, Address2: e.target.value });
                  }}
                  type="text"
                  name="addressLine2"
                />
                <Input
                  placeholder="Country*"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, Country: e.target.value });
                  }}
                  type="text"
                  name="country"
                  required
                />
                <Input
                  placeholder="Province"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, Province: e.target.value });
                  }}
                  type="text"
                  name="province"
                />
                <Input
                  placeholder="City*"
                  onChange={(e) => {
                    setbodystate({ ...bodystate, City: e.target.value });
                  }}
                  type="text"
                  name="city"
                  required
                />
                <Input
                  placeholder="Shipping Phone* 000-0000000"
                  onChange={(e) => {
                    setbodystate({
                      ...bodystate,
                      Phone: Number(e.target.value),
                    });
                  }}
                  type="tel"
                  maxLength="9"
                  name="shippingPhone"
                  required
                />
              </InputDiv>
              <Button type="submit">Continue To Billing</Button>
            </Form>
          )}
        </ShippingInfo>
      </div>
      <br style={{ clear: "both" }} />
      <Footer />
    </>
  );
}

export default ShippongInfo;

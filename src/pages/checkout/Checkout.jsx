import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import superagent from "superagent";
import { AuthContext } from "../../context/authentication";
import axios from "axios";

const ShippingInfo = styled.div`
  width: 60%;
  display: inline-block;
  border: 0.5px solid lightgray;
  margin: 90px 40px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: 10px;
  border: 0.5px solid gray;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  width: 400px;
  margin: 20px;
  padding: 10px;
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
  margin-top: 50px;
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
// -----------------------

function Checkout() {
  const [cartInfo, setCartInfo] = useState({
    totalPrice: 0,
    totalItems: 0,
  });
  const context = useContext(AuthContext);
  const [bodystate, setbodystate] = useState({ UserID: context.user.id });

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

    superagent
      .post("https://mid-project-01.herokuapp.com/api/v2/Address")
      .send({ ...bodystate, UserID: context.user.id })
      .set("Authorization", "Bearer " + context.token)
      .then((results) => {
        console.log(results.body);
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log(data);
  }

  return (
    <>
      <Navbar />
      <ShippingInfo>
        <Title>Shipping Info</Title>
        <Form onSubmit={handelSubmit}>
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
            type="text"
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
            placeholder="Shipping Phone*"
            onChange={(e) => {
              setbodystate({ ...bodystate, Phone: Number(e.target.value) });
            }}
            type="text"
            name="shippingPhone"
            required
          />
          {/* <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement> */}
          <Button type="submit">Continue To Billing</Button>
        </Form>
      </ShippingInfo>
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
    </>
  );
}

export default Checkout;

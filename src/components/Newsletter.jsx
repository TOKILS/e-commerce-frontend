import { Send } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Container = styled.div`
  height: 60vh;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [email, setemail] = useState("");
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input
          onChange={(e) => {
            setemail(e.target.value);
          }}
          value={email}
          name="email"
          placeholder="Your email"
        />
        <Button
          onClick={(e) => {
            <Alert severity="success">This is a success message!</Alert>;
            setemail("");
          }}
        >
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;

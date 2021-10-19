import styled from "styled-components";
import { mobile } from "../responsive";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authentication";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.ctfassets.net/rxqefefl3t5b/6I2vL9f0IVsDQ8qFgdrxH7/7660c4bab3116a4a04025d5c4802efa5/Virgin-Red-online-shopping-offers.jpg?fl=progressive&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const context = useContext(AuthContext);

  const history = useHistory();

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    context
      .signup(userName, passWord, firstname, lastname, email)
      .then((res) => (res ? history.push("/") : null));
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSignupSubmit}>
          <Input
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
          />

          <Input
            placeholder="password"
            onChange={(e) => setPassWord(e.target.value)}
            type="password"
            name="password"
          />
          <Input
            placeholder="name"
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            name="firstname"
          />
          <Input
            placeholder="last name"
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            name="lastname"
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

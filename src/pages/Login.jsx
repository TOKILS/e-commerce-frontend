import styled from "styled-components";
import { mobile } from "../responsive";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authentication";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/ggdps81/wallpaper2you-128794.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Links = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(AuthContext);

  const history = useHistory();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    context.login(username, password).then(()=>{history.push('/')})
  };


  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleLoginSubmit}>
          <Input placeholder="username" type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          <Button >LOGIN</Button>
          <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Link to="/Register"><Links >CREATE A NEW ACCOUNT</Links></Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

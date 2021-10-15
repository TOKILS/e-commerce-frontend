import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import superagent from "superagent";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    superagent
      .get("https://mid-project-01.herokuapp.com/api/v3/Products")
      .then((results) => {
        // console.log(results.body);

        setdata(results.body);
      });
  }, []);
  return (
    <Container>
      {data.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;

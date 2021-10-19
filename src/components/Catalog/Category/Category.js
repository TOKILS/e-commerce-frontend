// import { Container } from "@material-ui/core";
import React from "react";
import ProductCard from "../../Products/ProductCard/ProductCard";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Category = ({ products }) => {
  return (
    <>
      {products && (
        <Container>
          {products.map((product, index) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Container>
      )}
    </>
  );
};

export default Category;

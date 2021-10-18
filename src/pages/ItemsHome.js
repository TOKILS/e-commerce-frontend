import React from "react";
import ProductCard from "../components/Products/ProductCard/ProductCard";
// import styled from "styled-components";

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

const ItemsHome = ({ p }) => {

  return (
    // <Container>
  <ProductCard product={p} type={true} />
  // </Container>
  );
};

export default ItemsHome;

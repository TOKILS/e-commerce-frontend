import { Container } from "@material-ui/core";
import React from "react";
import ProductCard from "../../Products/ProductCard/ProductCard";

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

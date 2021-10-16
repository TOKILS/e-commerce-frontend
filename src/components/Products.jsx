import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { connect } from "react-redux";
import { getProductById } from "../controllers/products";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ id, addItem }) => {
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductById(id)
      .then((productRes) => {
        console.log(productRes);
        setProduct(productRes);
      })
      .catch((res) => console.log(res));
  }, [id]);

  return (
    <Container>
      <div>{product && <Product product={product} addItem={addItem} />}</div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch({ type: "ADD_ITEM", payload }),
  };
};

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);

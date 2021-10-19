// import { Container } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import ProductCard from "../../Products/ProductCard/ProductCard";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Category = ({ products }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    console.log("open", open);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      {products && (
        <Container>
          {products.map((product, index) => (
            <ProductCard handleClick={handleClick} product={product} key={product.id} />
          ))}
        </Container>
      )}
       <Stack>
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Added
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default Category;

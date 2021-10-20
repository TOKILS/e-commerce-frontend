import React, { forwardRef, useState } from "react";
import ProductCard from "../components/Products/ProductCard/ProductCard";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
 
const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemsHome = ({ p }) => {
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
      <ProductCard handleClick={handleClick} product={p} type={true} />

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

export default ItemsHome;

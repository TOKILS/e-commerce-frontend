import { useEffect, useState, useContext } from "react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import superagent from "superagent";
import { Carousel } from "react-bootstrap";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../context/authentication";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import { FormControl } from "@material-ui/core";
import styled from "styled-components";
// import AddCommentIcon from "@mui/icons-material/AddComment";
import AddCommentIcon from "@mui/icons-material/Add";
import "./reviews.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { When } from "react-if";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import BButton from "@mui/material/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: 10px;
  text-align: center;
  padding: 10px;
`;
const InputDiv = styled.div`
  width: 100%;
`;
const Button = styled.button`
  width: 25%;
  border: none;
  padding: 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 7px auto;
`;
const Input = styled.input`
  flex: 1;
  width: 290px;
  margin: 10px auto;
  padding: 10px;
  text-align: center;
  display: block;
  border: 1px solid teal;
`;
const Textarea = styled.textarea`
  flex: 1;
  width: 290px;
  margin: 10px auto;
  display: block;
  padding: 10px;
  text-align: center;
  border: 1px solid teal;
`;
const mainPrimaryTheme = createTheme({
  palette: {
    primary: {
      main: "#008080",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4E4E4E",
    },
  },
});
const ShippingInfo = styled.div`
  display: block;
  margin: 30px auto;
`;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlignItemsList() {
  const context = useContext(AuthContext);

  const [item, setitem] = useState(JSON.parse(localStorage.getItem("product")));
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [rev, setrev] = useState(0);

  const handleClose = (event, reason) => {
    settitle("");
    setdesc("");
    setrev(0);
    setShow(false);
  };

  const handleSave = (event, reason) => {
    setShow(false);
    superagent
      .post(`https://mid-project-01.herokuapp.com/api/v2/Reviews`)
      .send({
        ProductID: item.id,
        UserID: context.user.id,
        Title: title,
        Description: desc,
        Rating: rev,
      })
      .set("Authorization", "Bearer " + context.token)
      .then((res) => {
        handleClose();
        callRating();
      });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenDelete(false);
  };
  // const handleClose = () => setShow(false);
  const handleShow = () => {
    if (context.loggedIn) {
      setShow(true);
    } else setOpenDelete(true);
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    callRating();
  }, []);

  function callRating() {
    superagent
      .get("https://mid-project-01.herokuapp.com/api/v3/reviews/" + item.id)
      .then((res) => {
        setReviews(res.body);
        console.log(res.body);
      });
  }

  function deleteReview(id) {
    superagent
      .delete(`https://mid-project-01.herokuapp.com/api/v2/Reviews/${id}`)
      .set("Authorization", "Bearer " + context.token)
      .then((res) => {
        callRating();
      });
  }
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  return (
    <>
      <List sx={{ width: "100%" }}>
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          Reviews
        </Typography>
        <When condition={reviews.length}>
          <AliceCarousel
            mouseTracking
            responsive={responsive}
            controlsStrategy="alternate"
            items={reviews.map((review) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={review.UserID.username.toUpperCase()}
                    //   src={review.Image}
                    sx={{ width: 50, height: 50, marginRight: 2 }}
                    src="x"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={review.Title}
                  secondary={
                    <>
                      <Rating
                        name="read-only"
                        value={review.Rating}
                        readOnly
                        size="small"
                      />
                      <ListItemText
                        secondary={new Date(
                          Date.parse(review.createdAt)
                        ).toDateString()}
                      />

                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.UserID.username.toUpperCase()}
                      </Typography>
                      {` — ${review.Description}`}

                      {context.user.id === review.UserID.id ? (
                        <IconButton aria-label="delete">
                          <DeleteIcon
                            style={{ width: "0.9rem" }}
                            onClick={() => deleteReview(review.id)}
                          />
                        </IconButton>
                      ) : null}
                    </>
                  }
                />{" "}
              </ListItem>
            ))}
          />
          {/* <Carousel>
            {reviews.map((review) => (
              <Carousel.Item style={{ padding: "20px" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={review.UserID.username.toUpperCase()}
                      //   src={review.Image}
                      sx={{ width: 50, height: 50, marginRight: 2 }}
                      src="x"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.Title}
                    secondary={
                      <>
                        <Rating
                          name="read-only"
                          value={review.Rating}
                          readOnly
                          size="small"
                        />
                        <ListItemText
                          secondary={new Date(
                            Date.parse(review.createdAt)
                          ).toDateString()}
                        />

                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {review.UserID.username.toUpperCase()}
                        </Typography>
                        {` — ${review.Description}`}

                        {context.user.id === review.UserID.id ? (
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              style={{ width: "0.9rem" }}
                              onClick={() => deleteReview(review.id)}
                            />
                          </IconButton>
                        ) : null}
                      </>
                    }
                  />{" "}
                  <ListItemAvatar>
                    <Avatar
                      alt={review.UserID.username.toUpperCase()}
                      //   src={review.Image}
                      sx={{ width: 50, height: 50, marginRight: 2 }}
                      src="x"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.Title}
                    secondary={
                      <>
                        <Rating
                          name="read-only"
                          value={review.Rating}
                          readOnly
                          size="small"
                        />
                        <ListItemText
                          secondary={new Date(
                            Date.parse(review.createdAt)
                          ).toDateString()}
                        />

                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {review.UserID.username.toUpperCase()}
                        </Typography>
                        {` — ${review.Description}`}

                        {context.user.id === review.UserID.id ? (
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              style={{ width: "0.9rem" }}
                              onClick={() => deleteReview(review.id)}
                            />
                          </IconButton>
                        ) : null}
                      </>
                    }
                  />{" "}
                  <ListItemAvatar>
                    <Avatar
                      alt={review.UserID.username.toUpperCase()}
                      //   src={review.Image}
                      sx={{ width: 50, height: 50, marginRight: 2 }}
                      src="x"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.Title}
                    secondary={
                      <>
                        <Rating
                          name="read-only"
                          value={review.Rating}
                          readOnly
                          size="small"
                        />
                        <ListItemText
                          secondary={new Date(
                            Date.parse(review.createdAt)
                          ).toDateString()}
                        />

                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {review.UserID.username.toUpperCase()}
                        </Typography>
                        {` — ${review.Description}`}

                        {context.user.id === review.UserID.id ? (
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              style={{ width: "0.9rem" }}
                              onClick={() => deleteReview(review.id)}
                            />
                          </IconButton>
                        ) : null}
                      </>
                    }
                  />
                </ListItem>
              </Carousel.Item>
            ))}
          </Carousel> */}
        </When>
      </List>

      <ThemeProvider theme={mainPrimaryTheme}>
        <BButton
          sx={{ float: "right" }}
          variant="contained"
          startIcon={<Add />}
          className="addUsersUsersBtn"
          onClick={handleShow}
        >
          Add Review
        </BButton>
      </ThemeProvider>
      <br style={{ clear: "both" }} />

      <Dialog open={show} onClose={handleClose}>
        <DialogContent>
          {/* <DialogContentText>
            To Add Review to this Product, please fill the form.
          </DialogContentText>  */}
          <>
            <>
              <Title>Add Review</Title>
              <InputDiv>
                {/* <Typography component="legend">Title</Typography> */}
                <div
                  style={{
                    alignItems: "center",
                    flex: 1,
                    width: "290px",
                    margin: " 10px auto",
                    padding: " 10px",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  <Rating
                    name="simple-controlled"
                    value={rev}
                    onChange={(event, newValue) => {
                      setrev(newValue);
                    }}
                  />
                </div>
                <Input
                  placeholder="Title"
                  label="Title"
                  onChange={(e) => settitle(e.target.value)}
                  required
                />

                {/* <Typography component="legend">Description</Typography> */}
                <Textarea
                  placeholder="Description"
                  label="Description"
                  onChange={(e) => setdesc(e.target.value)}
                  rows="3"
                  required
                />
              </InputDiv>
              <div style={{ display: "flex" }}>
                {" "}
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Send</Button>
              </div>
            </>
          </>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openDelete}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          <h4>Please sign in ..</h4>
        </Alert>
      </Snackbar>
    </>
  );
}

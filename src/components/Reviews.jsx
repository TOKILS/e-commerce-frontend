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
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/authentication";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { display } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// import "bootstrap/dist/css/bootstrap.min.css";

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
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Typography variant="h3" component="div">
          Reviews
          <Button variant="outline-info" onClick={handleShow}>
            +
          </Button>
        </Typography>

        {reviews.length ? (
          reviews.map((review) => (
            <>
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

                      <br />
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
                        <>
                          <IconButton
                            aria-label="delete"
                            style={{ color: "teal" }}
                          >
                            <DeleteIcon
                              onClick={() => deleteReview(review.id)}
                            />
                          </IconButton>
                        </>
                      ) : null}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))
        ) : (
          <Typography padding="10px" variant="h6" color="gray" component="div">
            No Reviews
          </Typography>
        )}
      </List>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title : </Form.Label>
              <Form.Control
                onChange={(e) => settitle(e.target.value)}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description : </Form.Label>
              <Form.Control
                onChange={(e) => setdesc(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ position: "relative", top: "9px" }}> Rating : </p>
              <Rating
                name="simple-controlled"
                value={rev}
                onChange={(event, newValue) => {
                  setrev(newValue);
                }}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
          <h4>You Need To SIGN IN ...</h4>
        </Alert>
      </Snackbar>
    </>
  );
}

import { useEffect, useState } from "react";
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
export default function AlignItemsList() {
  const [item, setitem] = useState(JSON.parse(localStorage.getItem("product")));

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    superagent
      .get("https://mid-project-01.herokuapp.com/api/v3/reviews/" + item.id)
      .then((res) => setReviews(res.body));
    console.log(item.id);
  }, []);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Typography variant="h3" component="div">
        Reviews
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
  );
}

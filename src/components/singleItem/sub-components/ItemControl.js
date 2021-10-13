// general
import { connect } from "react-redux";

// styled components
import { Button, Select, MenuItem,FormControl,InputLabel  } from "@mui/material";

// components
import ItemCarousel from "./ItemCarousel";

// star SVGs
import fullStare from "../../../resources/outline_star_black_36dp.png";
import halfStar from "../../../resources/outline_star_half_black_36dp.png";
import borderStar from "../../../resources/outline_star_outline_black_36dp.png";
import { useState } from "react";

const ItemControl = (props) => {
    const [selectedModel, setSelectedModel] = useState("");
    function selectModelHandleChange(event) {
        setSelectedModel(event.target.value);
    }

    function renderReviewSars(num) {
        console.log("renderReviewSars ran");
        let numBack = num;
        let arr = [0, 1, 2, 3, 4];
        return arr.map((n) => {
            if (numBack > 0.66) {
                numBack--;
                return <img src={fullStare} />;
            } else if (numBack > 0.33) {
                numBack--;
                return <img src={halfStar} />;
            } else {
                numBack--;
                return <img src={borderStar} />;
            }
        });
    }

    return (
        <div className="ItemControl">
            <ItemCarousel images={props.currentItem.images} />
            <div className="itemInfoAndSettings">
                <div className="titleAndReviews">
                    <h2>{props.currentItem.productTitle}</h2>
                    <div className="singleItemReviews">
                        <div>{renderReviewSars(3.6)}</div>
                        <div>
                            {props.currentItem.reviews.reviewsNumber} {props.currentItem.reviews.reviewsNumber === 1 ? "review" : props.currentItem.reviews.reviewsNumber === 0 ? "no reviews yet" : "reviews"}
                        </div>
                    </div>
                </div>
                <div className="priceAndModel">
                    <div>${props.currentItem.price}</div>
                    <div>
                        <FormControl sx={{ minWidth: 250}} size="small" fullWidth>
                            <InputLabel >type</InputLabel>
                            <Select value={selectedModel} label="Age" onChange={selectModelHandleChange}>
                                {props.currentItem.models.map((model, idx) => {
                                    return <MenuItem value={idx}>{model.name}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="itemDescription">{props.currentItem.description}</div>
                <Button className="addToCartBtn">Add to cart</Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentItem: state.currentItem,
});

export default connect(mapStateToProps)(ItemControl);

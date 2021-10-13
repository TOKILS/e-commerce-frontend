import React from "react";
import Carousel from "react-material-ui-carousel";


const ItemCarousel = (props) => {
    return (
        <div className="ItemCarousel">
            <Carousel>
                {props.images.map((image, i) => (
                    <img className="carousalImg" src={image} key={i} />
                ))}
            </Carousel>
        </div>
    );
};



export default ItemCarousel;

// general
import { useContext, useState } from "react";

// styled components

// components
import ItemControl from "./sub-components/ItemControl";


// CSS
import "./singleItem.scss";

const SingleItem = (props) => {
   
    return (
        <div className="SingleItem">
            <ItemControl />
        </div>
    );
};


export default SingleItem;

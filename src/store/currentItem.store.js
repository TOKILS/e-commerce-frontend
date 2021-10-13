import superagent from "superagent";

import { createSlice } from "@reduxjs/toolkit";

const currentItemSlice = createSlice({
    name: "currentItem",
    initialState: {
        productTitle: "tkt title",
        reviews: {
            reviewsNumber: "15",
            reviewsAverage: "3.5",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque erat quam, et vestibulum nunc elementum sed. Aliquam in ullamcorper nisi, sit amet pulvinar nisl. Vivamus quis fermentum diam. Duis posuere sem mauris, ut cursus felis varius sit amet. Maecenas libero nibh, auctor ut rutrum vitae, tincidunt eu elit",
        images: ["https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-XpS7nX.jpg", "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-XpS7nX.jpg"],
        price: "25",
        models: [
            {
                name: "orange",
            },
            {
                name: "black",
            },
            {
                name: "green",
            },
        ],
    },
    reducers: {
        changeItem(state, action) {
            console.log("changeItem ran");
        },
    },
});

// TODO: fix vvv when we have products on the backend

// export const get = () => async dispatch => {
//   const response = await superagent.get(process.env.BACKEND);
//   const data = await response.JSON();
// }

export const { changeItem } = currentItemSlice.actions;

export default currentItemSlice.reducer;
import axios from "axios";
import {
    POST_CART,
    POST_CART_GUEST,
    HANDLE_GUEST_CART,
    REMOVE_ITEM,
    EMPTY_CART,
    GET_CART,
    SET_NEW_CART,
    HANDLE_GUEST_QUANTITY,
    LOAD_CART_GUEST,
    HANDLE_GUEST_DELETE_ITEM
} from "./action_types";

import {
    GET_ITEMS_CART,
    POST_ITEM_CART,
    DELETE_CART,
    DELETE_ITEM,
} from "../../../constants/api";

export const postCart = (userId, proId) => (dispatch) => {
    axios
        .post(`${POST_ITEM_CART}/${userId}/cart`, {
            proId: proId,
        })
        .then((res) => {
            dispatch({
                type: POST_CART,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const postCartGuest = (productId) => {
    return {
        type: POST_CART_GUEST,
        payload: productId
    }
}

export const loadCartGuest = () => {
    return {
        type: LOAD_CART_GUEST,
    }
}

export const handleGuestCart = (payload) => {
    return {
        type: HANDLE_GUEST_CART,
        payload
    }
}

export const handleGuestDelete = (payload) => {
    return {
        type: HANDLE_GUEST_DELETE_ITEM,
        payload
    }
}

export const handleGuestQuantity = (operation, productId) => {
    return {
        type: HANDLE_GUEST_QUANTITY,
        payload: { operation, productId }
    }
}

export const getCart = (idUser) => (dispatch) => {
    axios
        .get(`${GET_ITEMS_CART}/${idUser}/cart`)
        .then((res) => {
            dispatch({
                type: GET_CART,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const emptyCart = (idUser) => (dispatch) => {

    if (!idUser) dispatch({ type: EMPTY_CART })

    axios
        .delete(`${DELETE_CART}/${idUser}/cart`)
        .then((res) => {
            dispatch({
                type: EMPTY_CART,
                payload: res,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const removeItem = (cartId, proId) => (dispatch) => {
    axios({
        method: "delete",
        url: `${DELETE_ITEM}/${cartId}`,
        data: {
            proId: proId,
        },
    })
        .then(() => {
            dispatch({
                type: REMOVE_ITEM,
                payload: proId,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const setNewCart = (payload) => {
    return {
        type: SET_NEW_CART,
        payload,
    };
};
import { GET_CART_BY_ID, NEW_CART_ROUTE, API_HOST } from "../constants/api";

export const getCartById = (userId) => {
    return new Promise((resolve, reject) => {
        fetch(`${GET_CART_BY_ID}/${userId}/cart`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error("It appears that the database url was not found"));
                        break;
                    default:
                        reject(new Error("It seems there was an error"));
                        break;
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const handleItemToCart = (cartId, productId, quantity) => {
    return new Promise((resolve, reject) => {
        fetch(`${NEW_CART_ROUTE}/${cartId}/handleitem`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, quantity }),
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 400:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error("It appears that the database url was not found"));
                        break;
                    default:
                        reject(new Error("It seems there was an error"));
                        break;
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const handleCreateCart = (userId) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_HOST}/users/${userId}/cart`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 400:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error("It appears that the database url was not found"));
                        break;
                    default:
                        reject(new Error("It seems there was an error"));
                        break;
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const handleQuantityController = (cartId, productId, quantity) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_HOST}/cart/${cartId}/handleItem`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: productId, quantity: quantity }),
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 400:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error("It appears that the database url was not found"));
                        break;
                    default:
                        reject(new Error("It seems there was an error"));
                        break;
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const handleDeleteItem = (cartId, productId) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_HOST}/cart/${cartId}/deleteitem`, {
            method: "DELETE",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: productId }),
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 400:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error("It appears that the database url was not found"));
                        break;
                    default:
                        reject(new Error("It seems there was an error"));
                        break;
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

export const addOneItemToCart = (cartId, productId) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_HOST}/cart/${cartId}/addone`, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: productId }),
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 400:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error("It appears that the database url was not found"));
                        break;
                    default:
                        reject(new Error("It seems there was an error"));
                        break;
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};
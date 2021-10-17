import {
    GET_PRODUCT,
    GET_PRODUCTS,
    POST_PRODUCT,
    DELETE_PRODUCT,
    PUT_PRODUCT,
} from "../constants/api";

// LISTAR PRODUCTOS
export const getProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(GET_PRODUCTS, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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

export const getSearchProducts = (value) => {
    return new Promise((resolve, reject) => {
        fetch(`${GET_PRODUCT}/${value}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                resolve(response.json());
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

// AGREGAR PRODUCTO
export const createProduct = (formData) => {
    return new Promise((resolve, reject) => {
        fetch(POST_PRODUCT, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            },
            body: formData,
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

// BUSCAR PRODUCTO
export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${GET_PRODUCT}/${id}`)
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

// MODIFICAR PRODUCTO
export const updateProduct = (id, dataForm) => {
    return new Promise((resolve, reject) => {
        fetch(`${PUT_PRODUCT}/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            },
            body: dataForm,
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

// AGREGAR CATEGORIA A UN PRODUCTO
export const addCategories = (id, idCategory) => {
    return new Promise((resolve, reject) => {
        fetch(`${POST_PRODUCT}/${id}/category/${idCategory}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            }
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

// ELIMINAR PRODUCTO
export const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${DELETE_PRODUCT}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            }
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

export const handleStockOnPayment = (id, buyedQuantity) => {
    return new Promise((resolve, reject) => {
        fetch(`${PUT_PRODUCT}/${id}/handle-stock`, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ buyedQuantity: buyedQuantity }),
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
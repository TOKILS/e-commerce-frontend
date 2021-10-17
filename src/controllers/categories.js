import {
    GET_CATEGORIES,
    DELETE_CATEGORY,
    PUT_CATEGORY,
    POST_CATEGORY,
    GET_PRODUCTS_CATEGORY
} from '../constants/api';


// LISTAR CATEGORIAS
export const getCategories = () => {
    return new Promise((resolve, reject) => {
        fetch(GET_CATEGORIES)
            .then(response => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error('It appears that the database url was not found'));
                        break;
                    default:
                        reject(new Error('It seems there was an error'));
                        break;
                }
            })
            .catch(err => {
                reject(new Error(err.message));
            })
    })
}

// AGREGAR CATEGORIA
export const createCategory = dataForm => {
    return new Promise((resolve, reject) => {
        fetch(POST_CATEGORY, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            },
            body: JSON.stringify(dataForm)
        })
            .then(response => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error('It appears that the database url was not found'));
                        break;
                    default:
                        reject(new Error('It seems there was an error'));
                        break;
                }
            })
            .catch(err => {
                reject(err.message);
            })
    })
}

// MODIFICAR CATEGORIA
export const updateCategory = (id, dataForm) => {
    return new Promise((resolve, reject) => {
        fetch(`${PUT_CATEGORY}/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            },
            body: JSON.stringify(dataForm)
        })
            .then(response => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error('It appears that the database url was not found'));
                        break;
                    default:
                        reject(new Error('It seems there was an error'));
                        break;
                }
            })
            .catch(err => {
                reject(err.message);
            })
    })
}

// ELIMINAR CATEGORIA
export const deleteCategory = id => {
    return new Promise((resolve, reject) => {
        fetch(`${DELETE_CATEGORY}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('session')}`
            }
        })
            .then(response => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error('It appears that the database url was not found'));
                        break;
                    default:
                        reject(new Error('It seems there was an error'));
                        break;
                }
            })
            .catch(err => {
                reject(err.message);
            })
    })
}

// LISTAR PRODUCTOS POR CATEGORIA
export const getProductsByCategory = name => {
    return new Promise((resolve, reject) => {
        fetch(`${GET_PRODUCTS_CATEGORY}/${name}`)
            .then(response => {
                switch (response.status) {
                    case 200:
                        resolve(response.json());
                        break;
                    case 404:
                        reject(new Error('It appears that the database url was not found'));
                        break;
                    default:
                        reject(new Error('It seems there was an error'));
                        break;
                }
            })
            .catch(err => {
                reject(new Error(err.message));
            })
    })
}



// ELIMINAR CATEGORIA DE UN PRODUCTO
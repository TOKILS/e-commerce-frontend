import {
    POST_CART,
    POST_CART_GUEST,
    REMOVE_ITEM,
    EMPTY_CART,
    GET_CART,
    PLUS_ONE,
    MINUS_ONE,
    SET_NEW_CART,
    HANDLE_GUEST_QUANTITY,
    LOAD_CART_GUEST,
    HANDLE_GUEST_DELETE_ITEM
} from "../actions/action_types";

const initialState = {
    products: [],
    total: 0,
    id: 0,
};

const cart_reducer = (state = initialState, action) => {
    switch (action.type) {

        case POST_CART:
            return {
                ...state,
                products: [...state.products, action.payload],
                total: state.products.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2),
            };

        case POST_CART_GUEST:

            const isInCart = state.products.filter(p => p.id === action.payload.id);
            if (isInCart.length === 1) {
                const mapedProducts = state.products.map(p => {
                    if (p.id === action.payload.id) {
                        let newP = p;
                        newP.orderLine.quantity = newP.orderLine.quantity >= 1 ? newP.orderLine.quantity + 1 : 1;
                        newP.orderLine.price = newP.orderLine.quantity * parseFloat(newP.price);
                        return newP;
                    }
                    return p;
                })
                window.localStorage.setItem('products_cart', JSON.stringify(mapedProducts));
                const total = state.products.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0);
                window.localStorage.setItem('cart_total', total)
                return {
                    ...state,
                    products: mapedProducts,
                    total: mapedProducts.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2)
                }
            }

            let newProduct = action.payload;
            newProduct.orderLine = {
                quantity: 1,
                price: parseInt(newProduct.price)
            }

            const products_storage = [...state.products, newProduct]
            window.localStorage.setItem('products_cart', JSON.stringify(products_storage))

            const cart_total = state.products.total > 0 ?
                state.products.reduce((prev, { orderLine }) =>
                    parseFloat(prev) + parseFloat(orderLine.price), 0) :
                parseFloat(newProduct.orderLine.price)
            window.localStorage.setItem('cart_total', cart_total)

            return {
                ...state,
                products: [...state.products, newProduct],
                total: state.products.total > 0 ?
                    state.products.reduce((prev, { orderLine }) =>
                        parseFloat(prev) + parseFloat(orderLine.price), 0) :
                    parseFloat(newProduct.orderLine.price)
            };


        case LOAD_CART_GUEST:
            return {
                ...state,
                products: JSON.parse(window.localStorage.getItem('products_cart')),
                total: parseFloat(JSON.parse(window.localStorage.getItem('cart_total')))
            }

        case HANDLE_GUEST_QUANTITY:

            const newProducts = state.products.map(p => {
                if (p.id === action.payload.productId) {
                    let newP = p;
                    if (action.payload.operation === '+') {
                        newP.orderLine.quantity = newP.orderLine.quantity <= newP.stock ?
                            newP.orderLine.quantity + 1 :
                            newP.orderLine.quantity;
                        newP.orderLine.price = newP.orderLine.quantity * newP.price
                    }
                    if (action.payload.operation === '-') {
                        newP.orderLine.quantity = newP.orderLine.quantity > 1 ?
                            newP.orderLine.quantity - 1 :
                            newP.orderLine.quantity;
                        newP.orderLine.price = newP.orderLine.quantity * newP.price
                    }
                    return newP

                }
                return p
            })

            window.localStorage.setItem('products_cart', JSON.stringify(newProducts))
            const total = newProducts.reduce((prev, { orderLine }) =>
                parseFloat(prev) + parseFloat(orderLine.price), 0)
            window.localStorage.setItem('cart_total', total)

            return {
                ...state,
                products: newProducts,
                total: newProducts.reduce((prev, { orderLine }) =>
                    parseFloat(prev) + parseFloat(orderLine.price), 0)
            }

        case HANDLE_GUEST_DELETE_ITEM:

            let products = JSON.parse(window.localStorage.getItem('products_cart'));
            const filteredProducts = products.filter(product => product.id !== action.payload)
            window.localStorage.setItem('products_cart', JSON.stringify(filteredProducts))

            return {
                ...state,
                products: filteredProducts,
                total: filteredProducts.reduce((prev, { orderLine }) =>
                    parseFloat(prev) + parseFloat(orderLine.price), 0)
            }

        case GET_CART:
            return {
                id: action.payload[0].id,
                products: action.payload[0].products,
                total: action.payload[0].products.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2),
            };

        case REMOVE_ITEM:
            return {
                ...state,
                products: state.products.filter((p) => p.id !== action.payload),
                total: state.products.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2),
            };

        case EMPTY_CART:

            window.localStorage.setItem('products_cart', JSON.stringify([]))
            window.localStorage.setItem('cart_total', 0)

            return {
                ...state,
                products: [],
                total: 0,
            };

        case PLUS_ONE:
            const productAdd = state.products.find((p) => p.id === action.payload);
            productAdd.orderLine.quantity += 1;
            productAdd.orderLine.price = productAdd.price * productAdd.orderLine.quantity

            const updatedAdd = state.products.map((p) => {
                if (productAdd.id === p.id) return productAdd;
                return p;
            });

            return {
                ...state,
                products: updatedAdd,

                total: state.products.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2),
            };

        case MINUS_ONE:
            const product = state.products.find((p) => p.id === action.payload);
            product.orderLine.quantity -= 1;
            product.orderLine.price -= product.price

            const updatedLess = state.products.map((p) => {
                if (product.id === p.id) return product;
                return p;
            });

            return {
                ...state,
                products: updatedLess,
                total: state.products.reduce((prev, { orderLine }) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2),
            };
        case SET_NEW_CART:
            return {
                products: [],
                total: 0,
                id: action.payload,
            };

        default:
            return state;
    }
};

export default cart_reducer;
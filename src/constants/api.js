export const API_HOST = "https://mid-project-01.herokuapp.com";
/*export const API_HOST = "http://localhost:3000";*/

//images
export const IMAGES_ROUTES = "";

//Acciones asociadas a Product
export const GET_PRODUCTS = `${API_HOST}/api/v3/Products`; //						LISTAR PRODUCTOS
export const POST_PRODUCT = `${API_HOST}/api/v2/Product`; //				 		AGREGAR PRODUCTO
export const GET_PRODUCT = `${API_HOST}/api/v3/Product`; //:id || ?value		BUSCAR PRODUCTO
export const PUT_PRODUCT = `${API_HOST}/api/v2/Product`; //:id 					MODIFICAR PRODUCTO
export const POST_PRODUCT_CATEGORY = `${API_HOST}/products`; //:id/category/:id  	AGREGAR CATEGORIA A UN PRODUCTO
export const POST_PRODUCT_CATEGORIES = `${API_HOST}/products/categories`; //:id AGREGAR CATEGORIAS A UN PRODUCTO
export const DELETE_PRODUCT = `${API_HOST}/api/v2/Product`; //:id 					ELIMINAR PRODUCTO

//Acciones asociadas a Category
export const GET_CATEGORIES = `${API_HOST}/api/v2/Category`; //				    LISTAR CATEGORIAS
export const POST_CATEGORY = `${API_HOST}/api/v2/Category`; //.body 		    AGREGAR CATEGORIA
export const PUT_CATEGORY = `${API_HOST}/api/v2/Category`; //:id & .body 	    MODIFICAR CATEGORIA
export const DELETE_CATEGORY = `${API_HOST}/api/v2/Category/`; //:id 			    ELIMINAR CATEGORIA
export const GET_PRODUCTS_CATEGORY = `${API_HOST}/products/search/category`; //:name			    LISTAR PRODUCTOS POR CATEGORIA
export const DELETE_PRODUCT_CATEGORY = `${API_HOST}/products`; //:id/category/:id 	ELIMINAR CATEGORIA DE UN PRODUCTO

// Acciones asociadas a User
export const POST_USER_SIGNUP = `${API_HOST}/users`;
export const POST_USER_SIGNIN = `${API_HOST}/users/login`;
export const GET_USER_BY_ID = `${API_HOST}/users`;
export const GET_USERS = `${API_HOST}/users`;
export const SIGN_IN_USER_GOOGLE = `${API_HOST}/users/login-google`;
export const GET_AUTH_ME = `${API_HOST}/auth/me`;
export const UPDATE_USER_STATUS = `${API_HOST}/users`;
export const PUT_RESET_CODE = `${API_HOST}/users/reset/code`;
export const POST_RESET_CODE = `${API_HOST}/users/reset`;

//Acciones asociados a Ordenes
export const PUT_ORDER = `${API_HOST}/cart`;
export const GET_ORDERS_BY_ID = `${API_HOST}/users`;
export const GET_ORDERS = `${API_HOST}/cart`;
export const GET_ORDER = `${API_HOST}/cart`;

//Acciones asociadas a Cart
export const GET_ITEMS_CART = `${API_HOST}/users`;
export const POST_ITEM_CART = `${API_HOST}/users`;
export const DELETE_CART = `${API_HOST}/users`;
export const DELETE_ITEM = `${API_HOST}/orders`;
export const ADD_ITEM_QUANTITY = `${API_HOST}/orders`;
export const SUBTRACT_ITEM_QUANTITY = `${API_HOST}/orders`;
export const GET_TOTAL_PRICE = `${API_HOST}/users`;
export const PUT_ITEM_QUANTITY = `${API_HOST}/users`;

export const GET_CART_BY_ID = `${API_HOST}/users`;

//Acciones asociadas a Review
export const GET_REVIEWS_BY_ID = `${API_HOST}/products`;
export const POST_REVIEW = `${API_HOST}/products`;
export const PUT_REVIEW = `${API_HOST}/products`;
export const DELETE_REVIEW = `${API_HOST}/products`;

//Acciones asociadas a Admin
export const GET_PRODUCTS_ADMIN = `${API_HOST}/products`;
export const GET_ORDERS_ADMIN = `${API_HOST}/orders`;
export const GET_USERS_ADMIN = `${API_HOST}/users`;
export const PUT_ORDER_STATUS = `${API_HOST}/orders/`;

// checkout
export const PROCESS_PAYMENT = `${API_HOST}/process_payment`;
export const SET_USER_INFO_TO_CART = `${API_HOST}/userinfo`;
export const POST_SEND_EMAIL = `${API_HOST}/userinfo/notification/sendemail`;

// new new new cart
export const NEW_CART_ROUTE = `${API_HOST}/cart`;
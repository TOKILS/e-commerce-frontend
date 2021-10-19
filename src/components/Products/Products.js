// import React, { useState, useEffect } from "react";
// import Product from "./Product/Product.js";
// import { connect } from "react-redux";
// import { getProductById } from "../../controllers/products";

// const Products = ({ id, addItem }) => {
//     const [product, setProduct] = useState();

//     useEffect(() => {
//         getProductById(id)
//             .then((productRes) => {
//                 setProduct(productRes);
//             })
//             .catch((res) => console.log(res));
//     }, [id]);

//     return (
//         <div>{product && <Product product={product} addItem={addItem} />}</div>
//     );
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addItem: (payload) => dispatch({ type: "ADD_ITEM", payload }),
//     };
// };

// const mapStateToProps = (state) => {
//     return {
//         state: state,
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Products);

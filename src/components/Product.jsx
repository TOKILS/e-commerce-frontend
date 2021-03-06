// import {
//   FavoriteBorderOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from "@material-ui/icons";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { update } from "../store/product/product";
// import { useContext } from "react";
// import { AuthContext } from "../context/authentication";
// import { When } from "react-if";
// import superagent from "superagent";
// import { updateCart } from "../store/cart/cart";
// import cookie from "react-cookies";
// const Info = styled.div`
//   opacity: 0;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.5s ease;
//   cursor: pointer;
// `;

// const Container = styled.div`
//   flex: 1;
//   margin: 5px;
//   min-width: 280px;
//   height: 350px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f5fbfd;
//   position: relative;
//   &:hover ${Info} {
//     opacity: 1;
//   }
// `;

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

// const Image = styled.img`
//   height: 75%;
//   z-index: 2;
// `;

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;
//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;

// const Product = ({ item }) => {
//   const { Name, Description, Price, Quantity, color, TypeID } = item;

//   const context = useContext(AuthContext);
//   const dispatch = useDispatch();

//   const addToCart = () => {
//     if (context.loggedIn) {
//       superagent
//         .post(`https://mid-project-01.herokuapp.com/api/v2/Cart`)
//         .send({
//           ProductID: item.id,
//           UserID: context.user.id,
//           ColorID: item.color[0].id,
//           SizeID: item.color[0].size[0].id,
//         })
//         .set("Authorization", "Bearer " + context.token)
//         .then((res) => {
//           dispatch(updateCart());
//         });
//     }
//   };

//   const addToWish = () => {
//     if (context.loggedIn) {
//       console.log({
//         ProductID: item.id,
//         UserID: context.user.id,
//         ColorID: item.color[0].id,
//         SizeID: 1,
//       });
//       // superagent
//       //   .post(`https://mid-project-01.herokuapp.com/api/v2/Wishlist`)
//       //   .send({
//       //     ProductID: item.id,
//       //     UserID: context.user.id,
//       //     ColorID: item.color[0].id,
//       //     SizeID: 1,
//       //   })
//       //   .set("Authorization", "Bearer " + context.token)
//       //   .then((res) => {});
//     }
//   };

//   return (
//     <Container>
//       <Circle />
//       <Image src={item.color[0].image[0].Image} />
//       <Info>
//         <Icon>
//           <ShoppingCartOutlined onClick={addToCart} />
//         </Icon>
//         <Icon onClick={() => dispatch(update(item))}>
//           <Link exact to="/Product">
//             <SearchOutlined />
//           </Link>
//         </Icon>
//         <Icon>
//           <FavoriteBorderOutlined onClick={addToWish} />
//         </Icon>
//       </Info>
//     </Container>
//   );
// };

// export default Product;

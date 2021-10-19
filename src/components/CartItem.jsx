import React, { useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Add, Remove } from "@material-ui/icons";
import superagent from "superagent";
import { AuthContext } from "../context/authentication";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  margin:5px 0;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

function CartItem({ UpdateSummery, item, UpdateItems }) {
  const context = useContext(AuthContext);
  const removeItem = () => {
    if (item.Quantity <= 1) {
      superagent
        .delete("https://mid-project-01.herokuapp.com/api/v2/Cart/" + item.id)
        .set("Authorization", "Bearer " + context.token)
        .then((res) => {
          UpdateSummery();
          UpdateItems();
        });
    } else {
      let quantity = item.Quantity - 1;
      superagent
        .put("https://mid-project-01.herokuapp.com/api/v2/Cart/" + item.id)
        .send({ Quantity: quantity })
        .set("Authorization", "Bearer " + context.token)
        .then((res) => {
          UpdateSummery();
          item.Quantity = item.Quantity - 1;
        })
        .catch((err) => console.log(err));
    }
  };

  const addItem = () => {
    superagent

      .put("https://mid-project-01.herokuapp.com/api/v2/Cart/" + item.id)
      .send({ Quantity: item.Quantity + 1 })
      .set("Authorization", "Bearer " + context.token)
      .then((res) => {
        UpdateSummery();
        item.Quantity = item.Quantity + 1;
      });
  };

  return (
    <Product>
      <ProductDetail>
        <Image src={item.img} />
        <Details>
          <ProductName>
            <b>Product:</b> {item.ProductID.Name}
          </ProductName>
          <ProductId>
            <b>ID:</b> {item.ProductID.id}
          </ProductId>
          <ProductColor color={item.ColorID.Code} />
          <ProductSize>
            <b>Size:</b> {item.SizeID.Size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Add style={{ cursor: "pointer" }} onClick={addItem} />
          <ProductAmount>{item.Quantity}</ProductAmount>

          <Remove style={{ cursor: "pointer" }} onClick={removeItem} />
        </ProductAmountContainer>

        <ProductPrice>$ {item.ProductID.Price}</ProductPrice>
      </PriceDetail>
    </Product>
  );
}

export default CartItem;

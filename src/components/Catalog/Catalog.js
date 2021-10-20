import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Announcement from "../Announcement";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import { mobile } from "../../responsive";
import Category from "./Category/Category.js";
import Typography from "@material-ui/core/Typography";



const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Catalog = ({ productsFilter, handleFilter, categories, types }) => {
    console.log(productsFilter);
    console.log(categories);
    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>Products</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onClick={handleFilter}>
                        <Option name="category" value="All">All</Option>
                        {types ? (
                            types.map((types, index) => (

                                <Option id={index} name="category" value={types.id}>{types.Name}</Option>


                            ))
                        ) : (
                            <Option>None types</Option>
                        )}
                    </Select>
                </Filter>
            </FilterContainer>
            {productsFilter &&

                productsFilter.length > 0 ? (
                <Category products={productsFilter} />

            )
                : (
                    <Typography variant="h6">Products not found ! :( try again !)</Typography>
                )

            }
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Catalog;














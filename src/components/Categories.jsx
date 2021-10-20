import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCategories } from "../controllers/categories";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err.message));
    }, []);

    return <Container>{categories && categories.map((item) => <CategoryItem item={item} key={item.id} />)}</Container>;
};

export default Categories;

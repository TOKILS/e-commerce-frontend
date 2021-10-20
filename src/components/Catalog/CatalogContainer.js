import React, { useState, useEffect } from "react";
import Catalog from "./Catalog";

import { getCategories, getProductsByType, getProductsByCategory } from "../../controllers/categories";
import {
    getProducts,
} from "../../controllers/products";



const CatalogContainer = ({ value }) => {
    const [products, setProducts] = useState();
    const [productsFilter, setProductsFilter] = useState();
    const [categories, setCategories] = useState();
    const [Types, setTypes] = useState();

    useEffect(() => {
        if (value) {
            getProducts()
                .then(productsRes => {
                    console.log('searchhhhhhhhhhhhh', productsRes);
                    setProducts(productsRes);
                    setProductsFilter(productsRes.filter(p => p.TypeID == value));
                })
                .catch((err) => console.log(err.message));
        } else {
            getProducts()
                .then(productsRes => {
                    console.log('prooooooooooooooooooooooooooooo', productsRes);
                    setProducts(productsRes);
                    setProductsFilter(productsRes)
                })
                .catch((err) => console.log(err.message));
        }

        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err.message));

        getProductsByType()
            .then((data) => {
                setTypes(data);
            })
            .catch((err) => console.log(err.message));

    }, [value]);

    const handleFilter = event => {
        event.target.value === 'All' ? setProductsFilter(products) : setProductsFilter(products.filter(p => p.TypeID == event.target.value))
    }
    //p.find(c => c.TypeID === event.target.value
    return (
        <>
            <Catalog productsFilter={productsFilter} handleFilter={handleFilter} categories={categories} types={Types} />
        </>
    );
};


export default CatalogContainer;
import React, { useState, useEffect } from "react";
import Catalog from "./Catalog";

import { getCategories } from "../../controllers/categories";
import {
    getProducts,
    getSearchProducts
} from "../../controllers/products";


const CatalogContainer = ({ value }) => {
    const [products, setProducts] = useState();
    const [productsFilter, setProductsFilter] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        if (value) {
            getSearchProducts(value)
                .then(productsRes => {
                    setProducts(productsRes);
                    setProductsFilter(productsRes)
                })
                .catch((err) => console.log(err.message));
        } else {
            getProducts()
                .then(productsRes => {
                    console.log(productsRes);
                    setProducts(productsRes);
                    setProductsFilter(productsRes)
                })
                .catch((err) => console.log(err.message));
        }

        getCategories()
            .then((data) => {
                console.log(data);
                setCategories(data);
            })
            .catch((err) => console.log(err.message));

    }, [value]);

    const handleFilter = event => event.target.name === 'category' && event.target.value === 'All' ? setProductsFilter(products) : setProductsFilter(products.filter(p => p.categories.find(c => c.name === event.target.value)))

    return (
        <>
            <Catalog productsFilter={productsFilter} handleFilter={handleFilter} categories={categories} />
        </>
    );
};


export default CatalogContainer;
import React, { useState, useEffect } from "react";
import Catalog from "./Catalog";

import { getCategories } from "../../controllers/categories";
import {
    getProducts,
} from "../../controllers/products";
import {
    getProductsByCategory
} from "../../controllers/categories";

const CatalogContainer = ({ value }) => {
    const [products, setProducts] = useState();
    const [productsFilter, setProductsFilter] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        if (value) {
            getProductsByCategory(value)
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

    const handleFilter = event => {
        console.log('+-+-+-', event);
        event.target.name === 'category' && event.target.value === 'All' ? setProductsFilter(products) : setProductsFilter(products.filter(p => p.find(c => c.TypeID === event.target.value)))
    }

    return (
        <>
            <Catalog productsFilter={productsFilter} handleFilter={handleFilter} categories={categories} />
        </>
    );
};


export default CatalogContainer;
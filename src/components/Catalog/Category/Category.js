import React from "react";
import ProductCard from "../../Products/ProductCard/ProductCard.js";

const Category = ({ products }) => {
    return (
        <>
            {products &&
                (
                    <>
                        {products.map((product, index) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </>
                )

            }

        </>
    );
};

export default Category;
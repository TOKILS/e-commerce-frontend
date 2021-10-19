// general
import { useEffect, useState } from "react";

// styled components
import { Button, Tabs, Tab } from "@mui/material";
import { Add } from "@mui/icons-material";

// components
import ProductsCards from "./ProductsCards";

const TypesTabs = ({ products, categoryTabItem, category, categoryIdx, types }) => {
    const [typeTabItem, setTypeTabItem] = useState(false);
    function handleTypeTabChange(e, newValue) {
        setTypeTabItem(newValue);
    }
    useEffect(() => {
        setTypeTabItem(false);
    }, [categoryTabItem]);
    return (
        <>
            <div key={categoryIdx} role="tabpanel" className="dashboardTypesBar" hidden={categoryTabItem !== categoryIdx}>
                {categoryTabItem === categoryIdx && (
                    <>
                        <Button disabled style={{ backgroundColor: "#70e2e24f" }}></Button>
                        <Tabs centered value={typeTabItem} onChange={handleTypeTabChange}>
                            {types.map((type, typeIdx) => {
                                if (category.id === type.CategoryID) {
                                    return <Tab key={typeIdx} label={type.Name} />;
                                }
                            })}
                        </Tabs>
                        <Button style={{ backgroundColor: "#70e2e24f" }}>
                            <Add />
                        </Button>
                    </>
                )}
            </div>

            {types.map((type, typeIdx) => {
                if (category.id === type.CategoryID) {
                    return <ProductsCards categoryTabItem={categoryTabItem} products={products} type={type} typeIdx={typeIdx} typeTabItem={typeTabItem} />;
                }
            })}
        </>
    );
};

export default TypesTabs;

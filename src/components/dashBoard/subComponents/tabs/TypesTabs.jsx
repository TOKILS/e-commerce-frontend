// general
import { useEffect, useState } from "react";

// styled components
import { Button, Tabs, Tab } from "@mui/material";
import { Add } from "@mui/icons-material";

// components
import ProductsCards from "./ProductsCards";

const TypesTabs = ({ products, categoryTabItem, category, categoryIdx, types }) => {
    const [typeTabItem, setTypeTabItem] = useState(false);
    const [filteredType, setFilteredType] = useState([]);
    function handleTypeTabChange(e, newValue) {
        setTypeTabItem(newValue);
    }
    useEffect(() => {
        setTypeTabItem(false);
        if (categoryTabItem === categoryIdx) {
            setTypeTabItem(0);
        }
        let fil = types.filter((type, idx) => {
            if (category.id === type.CategoryID) {
                return true;
            }
        });
        setFilteredType(fil);
    }, [categoryTabItem]);
    return (
        <>
            <div style={{ marginLeft: "1rem", marginRight: "1rem" }} key={categoryIdx} role="tabpanel" className="dashboardTypesBar" hidden={categoryTabItem !== categoryIdx}>
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
                        <Button disabled style={{ backgroundColor: "#70e2e24f" }} style={{ backgroundColor: "#70e2e24f" }}></Button>
                    </>
                )}
            </div>
            {filteredType.map((type, typeIdx) => {
                // console.log(`${category.Name} ${category.id} || ${type.CategoryIDName} ${type.CategoryID}`);

                // console.log(`RAN - ${category.Name} ${category.id} || ${type.CategoryIDName} ${type.CategoryID}`);
                // let oldCheckPass = checkPass;
                // checkPass++;
                // console.log(`oldCheckPass ${oldCheckPass} || checkPass ${checkPass}`);
                return <ProductsCards categoryTabItem={categoryTabItem} products={products} type={type} checkPass={typeIdx} typeTabItem={typeTabItem} />;
            })}
        </>
    );
};

export default TypesTabs;

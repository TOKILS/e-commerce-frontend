// general
import { useState, useEffect } from "react";

// styled components
import { Skeleton, IconButton, Button, Tabs, Tab, Typography, Snackbar, Alert as MuiAlert, Card, CardActions, CardContent, CardMedia, Box } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { ExitToApp, Add, Cached } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// components
import TypesTabs from "./TypesTabs";

// redux
import { connect } from "react-redux";
import { handleSnackBar } from "../../../../store/snackbar/snackbar.store";
import { refreshCategories, refreshTypes, refreshProducts } from "../../../../store/dashboard-products/dashboardProducts.store";

const Products = (props) => {
    // auto refresh categories list
    useEffect(async () => {
        await handleCategoryRefresh();
        await handleTypesRefresh();
        await handleProductsRefresh();
        setCategoryTabItem(0);
        console.log(`types vvv`);
        console.dir(props.types);
        console.log(`products vvv`);
        console.dir(props.products);
    }, []);

    // general
    const PrimaryTheme = createTheme({
        palette: {
            primary: {
                main: "#00bebe",
            },
            secondary: {
                main: "#345B63",
            },
        },
    });

    // category section
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categoryTabItem, setCategoryTabItem] = useState(false);
    // const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const handleCategoryTabChange = async (e, newValue) => {
        // await setSelectedCategoryId(e.target.getAttribute("category_id"));
        setCategoryTabItem(newValue);
        // await handleTypesRefresh();
    };
    async function handleRefreshAll() {
        await handleCategoryRefresh();
        await handleTypesRefresh();
        await handleProductsRefresh();
        console.log(`types vvv`);
        console.dir(props.types);
        console.log(`products vvv`);
        console.dir(props.products);
    }
    async function handleCategoryRefresh() {
        setCategoryLoading(true);
        let errorCheck = await props.refreshCategories();
        if (errorCheck?.error) {
            console.error("Error refreshing categories", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
        } else if (errorCheck?.successMsg) {
            props.handleSnackBar({
                show: true,
                type: "info",
                text: errorCheck.successMsg,
            });
        }
        setCategoryLoading(false);
    }
    // types section
    async function handleTypesRefresh() {
        let errorCheck = await props.refreshTypes();
        if (errorCheck?.error) {
            console.error("Error refreshing types", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
        } else if (errorCheck?.successMsg) {
            props.handleSnackBar({
                show: true,
                type: "info",
                text: errorCheck.successMsg,
            });
        }
    }

    // products section
    async function handleProductsRefresh() {
        let errorCheck = await props.refreshProducts();
        if (errorCheck?.error) {
            console.error("Error refreshing products", errorCheck.error.message);
            props.handleSnackBar({
                show: true,
                type: "error",
                text: errorCheck.error.message,
            });
        } else if (errorCheck?.successMsg) {
            props.handleSnackBar({
                show: true,
                type: "info",
                text: errorCheck.successMsg,
            });
        }
    }
    return (
        <>
            <div tabIndex="0" className="products">
                <ThemeProvider theme={PrimaryTheme}>
                    <div className="dashboardCategoriesBar">
                        <LoadingButton loading={categoryLoading} onClick={handleRefreshAll}>
                            <Cached />
                        </LoadingButton>
                        <Tabs className="categoriesTabs" centered value={categoryTabItem} onChange={handleCategoryTabChange}>
                            {props.categories.map((category, idx) => {
                                return <Tab key={category.id} style={categoryTabItem === idx ? { borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", backgroundColor: "#70e2e24f", transition: "0.3s" } : {}} label={category.Name} />;
                            })}
                        </Tabs>
                        <Button disabled style={{ backgroundColor: "rgb(241, 241, 241)" }}>
                        </Button>
                    </div>
                    {props.categories.map((category, categoryIdx) => {
                        return <TypesTabs products={props.products} categoryTabItem={categoryTabItem} category={category} categoryIdx={categoryIdx} types={props.types} />;
                    })}
                </ThemeProvider>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    categories: state.dashboardProducts.categories,
    types: state.dashboardProducts.types,
    products: state.dashboardProducts.products,
});

const mapDispatchToProps = { refreshCategories, refreshTypes, refreshProducts, handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(Products);

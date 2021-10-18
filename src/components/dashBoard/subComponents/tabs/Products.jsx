// general
import { useState } from "react";

// styled components
import { Skeleton, IconButton, Button, Tabs, Tab, Typography, Snackbar, Alert as MuiAlert, Card, CardActions, CardContent, CardMedia, Box } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { ExitToApp, Add, Cached } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

// redux
import { connect } from "react-redux";
import { refreshCategories } from "../../../../store/dashboard-products/dashboardProducts.store";

const Products = (props) => {
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
    const handleCategoryTabChange = (e, newValue) => {
        setCategoryTabItem(newValue);
    };
    async function handleCategoryRefresh() {
        setCategoryLoading(true);

        setTimeout(() => {
            setCategoryLoading(false);
        }, 1000);
    }

    // type section
    const [typeFinishedLoading, setTypeFinishLoading] = useState(true);
    const [typeTabItem, setTypeTabItem] = useState("0");
    const handleTypeTabChange = (e, newValue) => {
        setTypeTabItem(newValue);
    };
    // products section

    return (
        <>
            <div tabIndex="0" className="products">
                <ThemeProvider theme={PrimaryTheme}>
                    <Tabs className="categoriesTabs" centered value={categoryTabItem} onChange={handleCategoryTabChange}>
                        <LoadingButton loading={categoryLoading} onClick={handleCategoryRefresh}>
                            <Cached />
                        </LoadingButton>
                        <Tab style={categoryTabItem === 1 ? { borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", backgroundColor: "#70e2e24f", transition: "0.3s" } : {}} label="Category one" />
                        <Tab label="Users" />
                        <Tab label="Products" />
                        <Tab label="Support" />
                        <Button>
                            <Add />
                        </Button>
                    </Tabs>
                    <div role="tabpanel" className="productsCategory" hidden={categoryTabItem !== 1}>
                        {categoryTabItem === 1 && (
                            <Tabs centered value={typeTabItem} onChange={handleTypeTabChange}>
                                <Button style={{ backgroundColor: "#70e2e24f" }}>
                                    <Cached />
                                </Button>
                                <Tab style={{ backgroundColor: "#70e2e24f" }} label="Type one" />
                                <Tab style={{ backgroundColor: "#70e2e24f" }} label="Type two" />
                                <Tab style={{ backgroundColor: "#70e2e24f" }} label="Type three" />
                                <Tab style={{ backgroundColor: "#70e2e24f" }} label="Type four" />
                                <Button style={{ backgroundColor: "#70e2e24f" }}>
                                    <Add />
                                </Button>
                            </Tabs>
                        )}
                    </div>
                    <div role="tabpanel" className="productsType" hidden={typeTabItem !== 1}>
                        {typeTabItem === 1 && (
                            <Box m={2} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
                                <Card sx={{ backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem" }}>
                                    <CardMedia component="img" height="140" image="https://i.imgur.com/tJJ55WXh.jpg" alt="fire-dragon" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                                <Button sx={{ backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Add sx={{ transform: "scale(2)" }} />
                                </Button>
                            </Box>
                        )}
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    categories: state.dashboardProducts,
});

const mapDispatchToProps = { refreshCategories };

export default connect(mapStateToProps, mapDispatchToProps)(Products);

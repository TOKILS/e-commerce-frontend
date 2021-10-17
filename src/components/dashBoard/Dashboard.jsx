import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TabPanels from "./subComponents/TabPanels";

import { Skeleton, IconButton, Button, Tabs, Tab, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { ExitToApp } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// tabs
import Users from "./subComponents/tabs/Users";
import Products from "./subComponents/tabs/Products";
import Support from "./subComponents/tabs/Support";

import "./dashboard.scss";

const DashBoard = (props) => {
    const [finishedLoading, setFinishLoading] = useState(false);
    const [tabItem, setTabItem] = useState("0");

    // custom components & styling
    const whitePrimaryTheme = createTheme({
        palette: {
            primary: {
                main: "#ffffffe0",
            },
            secondary: {
                main: "#345B63",
            },
        },
    });
    const mainPrimaryTheme = createTheme({
        palette: {
            primary: {
                main: "#ff9a27",
            },
            secondary: {
                main: "#4e4e4e",
            },
        },
    });
    const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            color: "rgba(0, 0, 0, 0.7)",
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }));

    useEffect(() => {
        setTimeout(() => {
            setFinishLoading(true);
            setTabItem(0);
        }, 1000);
    }, []);

    let listArr = [
        {
            name: "Home",
            content: (
                <>
                    <div tabIndex="0" className="homeWelcome">
                        <span>
                            Welcome to the dashboard, the board to get your work done <br />
                            Please choose a tab to start your work
                        </span>
                    </div>
                </>
            ),
        },
        {
            name: "Users",
            content: <Users />,
        },
        {
            name: "Products",
            content: <Products />,
        },
        {
            name: "Support",
            content: <Support />,
        },
    ];
    const handleTabChange = (e, newValue) => {
        console.log("~ newValue", newValue);
        setTabItem(newValue);
    };
    return (
        <div className="dashBoard_shadow">
            <div className="dashBoard">
                <ThemeProvider theme={whitePrimaryTheme}>
                    <div className="dashBoard_sideBar">
                        <div className="dashBoard_logo">
                            <span>
                                <span style={{ fontWeight: "300" }}>Fashionable</span>
                                <br />
                                DashBoard
                            </span>
                        </div>
                        <hr />

                        {finishedLoading ? (
                            <Tabs orientation="vertical" value={tabItem} onChange={handleTabChange}>
                                <Tab sx={{ color: "white" }} label="Home" />
                                <Tab sx={{ color: "white" }} label="Users" />
                                <Tab sx={{ color: "white" }} label="Products" />
                                <Tab sx={{ color: "white" }} label="Support" />
                            </Tabs>
                        ) : (
                            <>
                                <Skeleton height={40} sx={{ bgcolor: "white", opacity: "0.5", marginBottom: "0.5rem" }}>
                                    <Button>list item</Button>
                                </Skeleton>
                                <Skeleton height={40} sx={{ bgcolor: "white", opacity: "0.5", marginBottom: "0.5rem" }}>
                                    <Button>list item</Button>
                                </Skeleton>
                                <Skeleton height={40} sx={{ bgcolor: "white", opacity: "0.5", marginBottom: "0.5rem" }}>
                                    <Button>list item</Button>
                                </Skeleton>
                                <Skeleton height={40} sx={{ bgcolor: "white", opacity: "0.5", marginBottom: "0.5rem" }}>
                                    <Button>list item</Button>
                                </Skeleton>
                            </>
                        )}

                        <LightTooltip title="Go back to the main site" placement="top">
                            <Link className="backToHomeBtn" to="/">
                                <IconButton size="large" color="inherit" aria-label="menu" sx={{ color: "#ffffffd0", transform: "scale(1.3)" }}>
                                    <ExitToApp />
                                </IconButton>
                            </Link>
                        </LightTooltip>
                    </div>
                </ThemeProvider>
                <ThemeProvider theme={mainPrimaryTheme}>
                    <div className="dashBoard_main">
                        <TabPanels tabItem={tabItem} listArr={listArr} />
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default DashBoard;

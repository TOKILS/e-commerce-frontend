// general
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import TabPanels from "./subComponents/TabPanels";

// styled components
import {
  Skeleton,
  IconButton,
  Button,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { ExitToApp, Add } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// tabs
import Users from "./subComponents/tabs/Users";
import Products from "./subComponents/tabs/Products";
import Orders from "./subComponents/tabs/Orders";
import Support from "./subComponents/tabs/Support";

import "./dashboard.scss";

// redux
import { connect } from "react-redux";
import { handleSnackBar } from "../../store/snackbar/snackbar.store";
import { borderRadius } from "@mui/system";
import { AuthContext } from "../../context/authentication";
const DashBoard = (props) => {
  const [finishedLoading, setFinishLoading] = useState(false);
  const [tabItem, setTabItem] = useState(false);

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
        main: "#00bebe",
        contrastText: "#fff",
      },
      secondary: {
        main: "#4e4e4e",
      },
    },
  });
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
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
  const context = React.useContext(AuthContext);
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if (context.loggedIn) {
      setisAdmin(context.user.capabilities[3] === "delete");
    }
  }, [context.loggedIn]);
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
      name: "Orders",
      content: <Orders />,
    },
    {
      name: "Support",
      content: <Support />,
    },
  ];
  const handleTabChange = (e, newValue) => {
    setTabItem(newValue);
  };

  // snackbar section
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.handleSnackBar({ show: false });
  };
  return (
    isAdmin && (
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
                <Tabs
                  orientation="vertical"
                  value={tabItem}
                  onChange={handleTabChange}
                >
                  <Tab
                    sx={{ fontWeight: "600", color: "white" }}
                    label="Home"
                  />
                  <Tab
                    sx={{ fontWeight: "600", color: "white" }}
                    label="Users"
                  />
                  <Tab
                    sx={{ fontWeight: "600", color: "white" }}
                    label="Products"
                  />
                  <Tab
                    sx={{ fontWeight: "600", color: "white" }}
                    label="Orders"
                  />
                  <Tab
                    sx={{ fontWeight: "600", color: "white" }}
                    label="Support"
                  />
                </Tabs>
              ) : (
                <>
                  <Skeleton
                    height={40}
                    sx={{
                      bgcolor: "white",
                      opacity: "0.5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Button>list item</Button>
                  </Skeleton>
                  <Skeleton
                    height={40}
                    sx={{
                      bgcolor: "white",
                      opacity: "0.5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Button>list item</Button>
                  </Skeleton>
                  <Skeleton
                    height={40}
                    sx={{
                      bgcolor: "white",
                      opacity: "0.5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Button>list item</Button>
                  </Skeleton>
                  <Skeleton
                    height={40}
                    sx={{
                      bgcolor: "white",
                      opacity: "0.5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Button>list item</Button>
                  </Skeleton>
                  <Skeleton
                    height={40}
                    sx={{
                      bgcolor: "white",
                      opacity: "0.5",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Button>list item</Button>
                  </Skeleton>
                </>
              )}

              <LightTooltip title="Go back to the main site" placement="top">
                <Link className="backToHomeBtn" to="/">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    sx={{ color: "#ffffffd0", transform: "scale(1.3)" }}
                  >
                    <ExitToApp />
                  </IconButton>
                </Link>
              </LightTooltip>
            </div>
          </ThemeProvider>
          <ThemeProvider theme={mainPrimaryTheme}>
            <div className="dashBoard_main">
              <TabPanels tabItem={tabItem} listArr={listArr} />
              {/* fab for the users panel */}
            </div>
          </ThemeProvider>
        </div>
        <Snackbar
          sx={{ bottom: "2rem!important", left: "2rem!important" }}
          open={props.snackbar.show}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={props.snackbar.type}
            sx={{ width: "100%", borderRadius: "20rem" }}
          >
            {props.snackbar.text}
          </Alert>
        </Snackbar>
      </div>
    )
  );
};
const mapStateToProps = (state) => ({
  snackbar: state.snackbar,
});

const mapDispatchToProps = { handleSnackBar };

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

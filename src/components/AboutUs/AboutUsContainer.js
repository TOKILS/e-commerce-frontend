import React from "react";
import { Grid } from "@material-ui/core";
import Announcement from "../Announcement";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./about.scss";
import AboutUs1 from "./AboutUs1";
import AboutUs2 from "./AboutUs2";

const AboutUsContainer = () => {
    return (
        <>
            <Announcement />
            <Navbar />
            <div className="aboutUsContainer">
                <AboutUs1 />
                <div class="gradient-border"><span>MEET THE TEAM</span></div>

                <AboutUs2 />
            </div>

            <Footer />
        </>
    );
};

export default AboutUsContainer;

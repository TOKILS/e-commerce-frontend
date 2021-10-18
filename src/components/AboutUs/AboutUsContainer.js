import React from 'react'
import { Grid } from '@material-ui/core'
import Announcement from '../Announcement'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './about.scss'
import AboutUs1 from './AboutUs1'
import AboutUs2 from './AboutUs2'

const AboutUsContainer = () => {




    return (
        <>
            <Announcement />
            <Navbar />
            <div class="gradient-border">MEET THE TEAM</div>
            <Grid container direction="column">
                <Grid item container>
                    <Grid item xs={false} sm={1} xl={2} />
                    <Grid item container xs={12} sm={10} xl={8} style={{ margin: "32px 0px" }}>

                        <AboutUs1 />

                    </Grid>
                    <Grid item xs={false} sm={1} xl={2} />
                    <Grid item xs={false} sm={1} xl={2} />
                    <Grid item container xs={12} sm={10} xl={8} style={{ margin: "32px 0px" }}>

                        <AboutUs2 />

                    </Grid>
                    <Grid item xs={false} sm={1} xl={2} />
                </Grid>

            </Grid>
            <Footer />
        </>
    )
}

export default AboutUsContainer
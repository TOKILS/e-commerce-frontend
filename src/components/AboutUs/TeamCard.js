import React, { useState } from 'react'
import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Link,
    Hidden,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Quote from '@material-ui/icons/FormatQuote';
import Book from '@material-ui/icons/MenuBook';
import Movie from '@material-ui/icons/Theaters';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Hobby from '@material-ui/icons/ThumbUp';
import styleUs from './styles'

const TeamCard = (props) => {
    const [checked, setChecked] = useState({
        quote: "false",
        book: "false",
        movie: "false",
        hobby: "false"
    })
    const classes = styleUs()

    const handler = (e) => {

        const target = e.currentTarget.name


        if (checked[target] === "") {
            setChecked({
                ...checked,
                [target]: "false"
            })
        } else if (checked[target] === "false") {
            setChecked({
                ...checked,
                [target]: ""
            })
        }
    }

    return (
        <Grid item Container className={classes.card}>
            <Grid item container className={classes.cardHead}>
                <Grid item>
                    <Avatar src={props.user.pic} className={classes.cardAvatar} />
                </Grid>
                <Grid item>
                    <Typography>{props.user.name}</Typography>
                </Grid>
            </Grid>
            <Grid item container className={classes.cartIcon}>
                <Grid item>
                    <IconButton color='inherit' name='quote' onClick={handler}>
                        <Quote />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton color='inherit' name='book' onClick={handler}>
                        <Book />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton color='inherit' name='movie' onClick={handler}>
                        <Movie />
                    </IconButton>
                </Grid>
                <Grid item >
                    <IconButton color='inherit' name='hobby' onClick={handler}>
                        <Hobby />
                    </IconButton>
                </Grid>
                <Grid item >
                    <IconButton >
                        <Link href={props.user.linkedIn}>
                            <LinkedIn style={{ color: grey[50] }} />
                        </Link>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container className={classes.cartInfo}>
                <Hidden xsUp={checked.quote}>
                    <Grid item container className={classes.cardText}>
                        <Grid item xs={3}>
                            <Typography>Quote: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{props.user.quote}</Typography>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden xsUp={checked.book}>
                    <Grid item container className={classes.cardText}>
                        <Grid item xs={3}>
                            <Typography>Book: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{props.user.book}</Typography>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden xsUp={checked.movie}>
                    <Grid item container className={classes.cardText}>
                        <Grid item xs={3}>
                            <Typography>Movie: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{props.user.movie}</Typography>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden xsUp={checked.hobby}>
                    <Grid item container className={classes.cardText}>
                        <Grid item xs={3}>
                            <Typography>Hobby: </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{props.user.hobby}</Typography>
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Grid>
    )
}

export default TeamCard
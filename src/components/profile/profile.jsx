"use strict";
import React from "react";
import Navbar from "../Navbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import "./profile.css";
// import { styled } from '@mui/material/styles';
import styled from "styled-components";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useContext, forwardRef } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { AuthContext } from "../../context/authentication";
import superagent from "superagent";
import Button from "@mui/material/Button";
import { updateCart } from "../../store/cart/cart";
import { DeleteIcon } from "@mui/icons-material/Delete";
import WishList from "./WishList";
import User from "./user";
import Order from "./order";
import Footer from "../Footer";
import Announcement from "../Announcement";
import Message from "./message";

export default function Profile() {
  const context = useContext(AuthContext);

  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState(null);
  const [userData, setUserData] = useState("");

  // useEffect(() => {

  //   clg('sddddd')
  // }, [wish])

  useEffect(() => {
    // my id is 15

    if (context.loggedIn) {
      // let userData = superagent
      //   .get()
      superagent
        .get(`https://mid-project-01.herokuapp.com/userinfo/${context.user.id}`)
        .then((response) => {
          setUserData(response.body);
          setActiveSection(<User user={response.body} />);
        });
    }
  }, [context.loggedIn]);

  console.log(activeSection, "aaaa");

  // setTimeout(() => {
  //

  // }, 2000);

  //  setActiveSection(<WishList wish={wish} setWish={setWish} />)

  return (
    <>
      <link
        href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>{" "}
      <Announcement />
      <Navbar />
      {/* 
      <Stack direction="row" spacing={2}>
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      </Stack> */}
      {/* ///////////////////////////////////////// */}
      {/* <h1>Wishlist</h1> */}
      <div class="container">
        <div class="view-account">
          <section class="module">
            <div class="module-inner">
              <div class="side-bar">
                <div class="user-info">
                  <img
                    class="img-profile img-circle img-responsive center-block"
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt=""
                  />
                  <ul class="meta list list-unstyled">
                    <li class="name">
                      {userData.firstname + " " + userData.lastname}
                      <label class="label label-info">
                        {context.user.role}
                      </label>
                    </li>
                    {/* <li class="email"><a href="#">Email : {userData.email}</a></li> */}
                    {/* <li class="activity">Last updatedAt: {userData.updatedAt}</li> */}
                  </ul>
                </div>
                <nav class="side-menu">
                  <ul
                    class="nav"
                    onClick={(e) => {
                      if (e.target.parentElement.tagName == "LI") {
                        // setmethod(e.target.innerText);
                        for (const li of document.querySelectorAll(
                          "li.active"
                        )) {
                          li.classList.remove("active");
                        }
                        e.target.parentElement.className = "active";
                      }
                    }}
                  >
                    <li
                      class="active"
                      onClick={() => setActiveSection(<User user={userData} />)}
                    >
                      <a href="#">
                        <span class="fa fa-user"></span> Profile
                      </a>
                    </li>

                    <li onClick={() => setActiveSection(<WishList />)}>
                      <a href="#wish">
                        <span class="fa fa-heart"></span> My Wishlist
                      </a>
                    </li>

                    {/* <li><a href="#"><span class="fa fa-cog"></span> Settings</a></li> */}
                    <li onClick={() => setActiveSection(<Order />)}>
                      <a href="#order">
                        <span class="fa fa-shopping-cart"></span> Orders
                      </a>
                    </li>

                    {/* <li onClick={() => setActiveSection(null)} ><a href="#"><span class="fa fa-credit-card"></span> Billing</a></li> */}

                    <li onClick={() => setActiveSection(<Message />)}>
                      <a href="#message">
                        <span class="fa fa-envelope"></span> Messages
                      </a>
                    </li>

                    {/* <li onClick={() => setActiveSection(null)}><a href="user-drive.html"><span class="fa fa-th"></span> Drive</a></li> */}
                  </ul>
                </nav>
              </div>

              <div class="content-panel">
                <div class="billing">
                  <div class="wrapper">
                    <div id="wishlist-king" class="wk-row">
                      {activeSection}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

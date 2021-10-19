import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import superagent from "superagent";
import { AuthContext } from "../../context/authentication";

function User({ user }) {
    // console.log(user.body)


    ////createdAt: "2021-10-18T16:33:04.220Z"
    // email: "laith@mozej.com"
    // firstname: "laith2"
    // id: 83
    // lastname: "laith3"
    // password: "$2b$10$/8RYl8f0IpMBkrru1NOXPOIvdnXoAA6M0ruFzYnX7L3C..k.hpIra"
    // role: "admin"
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODMsInVzZXJuYW1lIjoiYWRtaW4zIiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiLCJjcmVhdGUiLCJ1cGRhdGUiLCJkZWxldGUiXSwiaWF0IjoxNjM0NTc0OTg0fQ.5noxSXYav8a9I6-_57_zUXcQWv9_9IqBtXDkMn0wGnM"
    // updatedAt: "2021-10-18T16:33:59.751Z"
    // username: "admin3"
    // [[Prototype]]: Object
    const context = useContext(AuthContext);
    const updateUser = (e) => {
        e.preventDefault();
        let data = {
            username: e.target.userName.value,
            firstname: e.target.firstName.value,
            lastname: e.target.lastName.value,
            password: e.target.password.value,
            email: e.target.email.value,
        };
        superagent
            .put(`https://mid-project-01.herokuapp.com/updateAccount`)
            .send(data)
            .set("Authorization", "Bearer " + context.token)
            .then((res) => { })

    }



    return (
        <div>
            <form onSubmit={updateUser} class="container">
                <div class="row gutters">
                    <div class="col-md-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div class="card h-10">
                            <div class="card-body">
                                <div class="account-settings">
                                    <div class="user-profile">
                                        {/* <div class="user-avatar">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                                        </div> */}
                                        <h5 class="user-name">{user.body.username}</h5>
                                        <h6 class="user-email">{user.body.email}</h6>
                                    </div>
                                    <div class="about">
                                        <h5>About</h5>
                                        <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="row gutters">
                                    
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-8">
                                        <div class="form-group">
                                            <label for="fullName">First Name</label>
                                            <input name='firstName' type="text" class="form-control" id="fullName" placeholder="Enter first name" />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-8">
                                        <div class="form-group">
                                            <label for="lastName">Last Name</label>
                                            <input type="text" class="form-control" name="lastName" placeholder="Last Name" />
                                        </div>
                                    </div>

                                </div>
                                <div class="row gutters">

                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-8">
                                        <div class="form-group">
                                            <label for="phone">Password</label>
                                            <input type="text" class="form-control" name="password" placeholder="Enter phone number" />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-8">
                                        <div class="form-group">
                                            <label for="Street">User Name</label>
                                            <input type="name" class="form-control" name="userName" placeholder="Enter Street" />
                                        </div>
                                    </div>




                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-8">
                                            <div class="form-group">
                                                <label for="eMail">Email</label>
                                                <input type="email" class="form-control" name="email" placeholder="Enter email ID" />
                                            </div>
                                        <div class="text-left">

                                            <button type="submit" id="submit" name="submit" class="btn btn-primary">Update</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default User

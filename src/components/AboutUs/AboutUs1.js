import React from "react";
import "./aboutstyle.css";

const AboutUs = () => {
    return (
        <div style={{width:"70rem",display:"grid",gap: "5rem", gridTemplateColumns:"1fr 1fr 1fr", marginLeft:"auto", marginRight:"auto"}} >
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" style={{width:"100%", position:"relative", top:"7.5rem"}}>
                <div class="our-team">
                    <div class="picture">
                        <img class="img-fluid" src="https://ca.slack-edge.com/TNGRRLUMA-U01UMADP8QG-05a367c620c5-512" />
                    </div>
                    <div class="team-content">
                        <h3 class="name">Ibrahem Sarayrah</h3>
                        <h4 class="title">TOKILS Member</h4>
                    </div>
                    <ul class="social">
                        <li>
                            <a href="https://www.facebook.com/ibrahem.sarayrah" class="fa fa-facebook" aria-hidden="true"></a>
                        </li>
                        <li>
                            <a href="https://github.com/IbrahemSarayrah" class="fa fa-github" aria-hidden="true"></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/ibrahem-sarayrah-3a4277210/" class="fa fa-linkedin" aria-hidden="true"></a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-md-4 col-lg-3" style={{width:"100%"}}>
                <div class="our-team">
                    <div class="picture">
                        <img class="img-fluid" src="https://ca.slack-edge.com/TNGRRLUMA-U01TQN6UQP8-8e4aa80ea31d-512" />
                    </div>
                    <div class="team-content">
                        <h3 class="name">Tariq Abu-Laban</h3>
                        <h4 class="title">TOKILS Leader</h4>
                    </div>
                    <ul class="social">
                        <li>
                            <a href="https://www.facebook.com/Taariq.Ziad/" class="fa fa-facebook" aria-hidden="true"></a>
                        </li>
                        <li>
                            <a href="https://github.com/Abu-laban" class="fa fa-github" aria-hidden="true"></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/tariq-abulaban-bb002b204/" class="fa fa-linkedin" aria-hidden="true"></a>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="col-12 col-sm-6 col-md-4 col-lg-3" style={{width:"100%", position:"relative", top:"7.5rem"}}>
                <div class="our-team">
                    <div class="picture">
                        <img class="img-fluid" src="https://ca.slack-edge.com/TNGRRLUMA-U01TGN9EUEB-db28e5d92f77-512" />
                    </div>
                    <div class="team-content">
                        <h3 class="name">Omar Alazaizeh</h3>
                        <h4 class="title">TOKILS Member</h4>
                    </div>
                    <ul class="social">
                        <li>
                            <a href="" class="fa fa-facebook" aria-hidden="true"></a>
                        </li>
                        <li>
                            <a href="" class="fa fa-github" aria-hidden="true"></a>
                        </li>
                        <li>
                            <a href="" class="fa fa-linkedin" aria-hidden="true"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default AboutUs;

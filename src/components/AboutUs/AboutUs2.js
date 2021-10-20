import React from 'react'
import './aboutstyle.css'

const AboutUs = () => {


	return (
		<div style={{width:"70rem",display:"grid",gap: "5rem", gridTemplateColumns:"1fr 1fr 1fr", marginLeft:"auto", marginRight:"auto"}}>
			
				<div class="col-12 col-sm-6 col-md-4 col-lg-3" style={{width:"100%", position:"relative", bottom:"7.5rem"}}>
					<div class="our-team">
						<div class="picture">
							<img class="img-fluid" src="https://ca.slack-edge.com/TNGRRLUMA-U01TUDCP3HT-847ceef88e12-512" />
						</div>
						<div class="team-content">
							<h3 class="name">Khaled Tahat</h3>
							<h4 class="title">TOKILS Member</h4>
						</div>
						<ul class="social">
							<li><a href="https://www.facebook.com/khaled.tahat.31/" class="fa fa-facebook" aria-hidden="true"></a></li>
							<li><a href="https://github.com/KZTahat" class="fa fa-github" aria-hidden="true"></a></li>
							<li><a href="https://www.linkedin.com/in/khaled-z-tahat-1839211b2/" class="fa fa-linkedin" aria-hidden="true"></a></li>
						</ul>
					</div>
				</div>
			
			
				<div class="col-12 col-sm-6 col-md-4 col-lg-3" style={{width:"100%"}}>
					<div class="our-team">
						<div class="picture">
							<img class="img-fluid" src="https://ca.slack-edge.com/TNGRRLUMA-U01U3LHE17W-5caca8b458c5-512" />
						</div>
						<div class="team-content">
							<h3 class="name">Laith Hayajneh</h3>
							<h4 class="title">TOKILS Member</h4>
						</div>
						<ul class="social">
							<li><a href="https://www.facebook.com/profile.php?id=100002363921097" class="fa fa-facebook" aria-hidden="true"></a></li>
							<li><a href="https://github.com/Laith-Hayajneh" class="fa fa-github" aria-hidden="true"></a></li>
							<li><a href="https://www.linkedin.com/in/laith-hayajneh/" class="fa fa-linkedin" aria-hidden="true"></a></li>
						</ul>
					</div>
				</div>
			
				<div class="col-12 col-sm-6 col-md-4 col-lg-3" style={{width:"100%", position:"relative", bottom:"7.5rem"}}>
					<div class="our-team">
						<div class="picture">
							<img class="img-fluid" src="https://ca.slack-edge.com/TNGRRLUMA-U01UA4BUL5P-b3f7b9b9a33f-512" />
						</div>
						<div class="team-content">
							<h3 class="name">Suhaib Ersan</h3>
							<h4 class="title">TOKILS Member</h4>
						</div>
						<ul class="social">
							<li><a href="" class="fa fa-facebook" aria-hidden="true"></a></li>
							<li><a href="https://github.com/Suhaib-Ersan" class="fa fa-github" aria-hidden="true"></a></li>
							<li><a href="https://www.linkedin.com/in/suhaib-ersan/" class="fa fa-linkedin" aria-hidden="true"></a></li>
						</ul>
					</div>
				</div>
			
		</div>
	)
}

export default AboutUs
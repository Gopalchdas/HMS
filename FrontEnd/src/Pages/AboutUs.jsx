import React from 'react'
import './CSS/AboutUs.css'
import aboutUs from '../Components/Assets/whoweare.png'
const AboutUs = () => {
  return (
    <div className='about-page'>
      <div className="background-container-top">
        <div className="content">
            <h1>ABOUT</h1>
        </div>
        </div>
        <div className="background-container-bottom">
        <div className="about-us-left"><img src={aboutUs} alt="aboutus" /></div>
        <div className="about-us-right">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt a dolore fuga deserunt possimus adipisci. Inventore natus delectus accusamus hic nisi eius autem sapiente? Veniam in necessitatibus incidunt repudiandae illo. Accusamus nemo dolores, nobis dolor nam, voluptates molestias odio cupiditate quos sunt, suscipit magnam atque ex porro nesciunt voluptate numquam.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam repellat harum magni a cumque inventore aperiam accusantium veniam sit adipisci nulla aliquam, possimus modi! Dicta beatae, aperiam magni nam ab, cupiditate obcaecati saepe molestias praesentium eligendi blanditiis mollitia optio. Aut assumenda perspiciatis ullam distinctio quae fugit, error ut ex cupiditate?
            </p>
        </div>
        </div>
    </div>
  )
}

export default AboutUs

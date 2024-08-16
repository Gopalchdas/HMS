import React from 'react'
import './AboutUs.css'
import aboutUs from '../Assets/AboutUs.png'
import { Link } from 'react-router-dom'
const AboutUs = () => {
  return (
    <div className='about'>
        <div className="about-us-left"><img src={aboutUs} alt="aboutus" /></div>
        <div className="about-us-right">
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt a dolore fuga deserunt possimus adipisci. Inventore natus delectus accusamus hic nisi eius autem sapiente? Veniam in necessitatibus incidunt repudiandae illo. Accusamus nemo dolores, nobis dolor nam, voluptates molestias odio cupiditate quos sunt, suscipit magnam atque ex porro nesciunt voluptate numquam.</p>
           <Link to={'/aboutUs'}><button>Know More</button></Link>
        </div>
    </div>
  )
}

export default AboutUs

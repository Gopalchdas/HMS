import React from 'react'
import './Hero.css'
import heroHM from '../Assets/heroHM.png'
import { Link} from 'react-router-dom'

const Hero = () => {

  return (
    <div className='hero'> 
      <div className="hero-left"><h1>In Pursuit of Better <span>Health</span> Solution.
</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio alias, eum animi neque ut dignissimos eligendi.</p>
<Link to={'/appointment'}><button >BOOK AN APPOINTMENT</button></Link></div>
      <div className="hero-right"><img src={heroHM} alt="hero" /></div>
    </div>
  )
}

export default Hero

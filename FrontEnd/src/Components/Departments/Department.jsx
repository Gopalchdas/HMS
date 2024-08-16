import React from 'react'
import './Department.css'
import one from '../Assets/1.png'
import two from '../Assets/2.png'
import three from '../Assets/3.png'
import four from '../Assets/4.png'
import five from '../Assets/5.png'
import six from '../Assets/6.png'
const Department = () => {
  return (
    <div className='department'>
      <h1>Departments</h1>
      <div className='container'>
        <div className='container-item'><div className='top'><img src={one} alt="" /></div><div className='bottom'>CARDIOLOGY</div></div>
        <div className='container-item'><div className='top'><img src={two} alt="" /></div><div className='bottom'>OPHTHALMOLOGY</div></div>
        <div className='container-item'><div className='top'><img src={three} alt="" /></div><div className='bottom'>PULMONARY</div></div>
        <div className='container-item'><div className='top'><img src={four} alt="" /></div><div className='bottom'>DIAGNOSTICS</div></div>
        <div className='container-item'><div className='top'><img src={five} alt="" /></div><div className='bottom'>FOR DISABLED</div></div>
        <div className='container-item'><div className='top'><img src={six} alt="" /></div><div className='bottom'>LABORATORY</div></div>
      </div>
    </div>
  )
}

export default Department

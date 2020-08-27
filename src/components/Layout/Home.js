import React from 'react'
import logo from '../../wa-logo.png'

const Home = () => {
  return (
    <section className='section page-section home-image parallax text-light text-center'>
      <div className='container'>
        <h4 className=''>Plan Trips With Good Tides</h4>
        <div className="divider-custom divider-light">
          <div className="divider-custom-line"></div>
          <img className="divider-custom-icon" src={logo} alt=""></img>
          <div className="divider-custom-line"></div>
        </div>
        <h1>Captains Log</h1>
        <br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
    </section>
  )
}

export default Home

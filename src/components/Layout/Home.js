import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'
import logo from '../../wa-logo.png'

const unauthenticatedOptions = (
  <Fragment>
    <div><Button variant="primary" href="#sign-in">Sign In</Button></div>
    <br></br>
    <div><Button variant="success" href="#sign-up">Sign Up</Button></div>
  </Fragment>
)

const authenticatedOptions = (
  <Fragment>
    <div><Button variant="primary" href="#trips">View Trips</Button></div>
    <br></br>
    <div><Button variant="success" href="#create-trip">Create Trip</Button></div>
  </Fragment>
)

const Home = ({ user }) => {
  console.log('user is: ', user)
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
        <br></br>
        <div>
          { user && <span >Welcome, {user.email}</span>}
        </div>
        <br></br><br></br>
        <div>
          { user ? authenticatedOptions : unauthenticatedOptions }
        </div>
        <br></br><br></br><br></br><br></br>
      </div>
    </section>
  )
}

export default Home

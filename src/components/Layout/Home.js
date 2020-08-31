import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'

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
  return (
    <section className='section page-section home-image parallax text-light text-center'>
      <div className='container'>
        <h4 className=''>Plan Trips With Good Tides</h4>
        <h1>Captains Log</h1>
        <div>{ user && <span >Welcome, {user.email}</span>}</div>
        <br></br>
        <div>
          { user ? authenticatedOptions : unauthenticatedOptions }
        </div>
      </div>
    </section>
  )
}

export default Home

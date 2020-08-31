import React, { Fragment } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment><Nav.Link href="#/">Home</Nav.Link></Fragment>
)

const Header = ({ user }) => (
  <Navbar sticky="top" bg="light" variant="light" expand="md">
    <Navbar.Brand href="#">Captain&apos;s Log</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { alwaysOptions }
        { user ? authenticatedOptions : <span></span> }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header

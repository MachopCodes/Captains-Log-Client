import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Home from '../Layout/Home'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import SignUp from '../Auth/SignUp'
import SignIn from '../Auth/SignIn'
import SignOut from '../Auth/SignOut'
import ChangePassword from '../Auth/ChangePassword'
import TripCreate from '../Trip/CreateTrip'
import TripIndex from '../Trip/IndexTrip'
import TripShow from '../Trip/ShowTrip'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      trip: null,
      tides: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  setTrip = trip => this.setState({ trip })
  clearTrip = () => this.setState({ trip: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='' component={Home} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-trip' render={(props) => (
            <TripCreate{...props} user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/trips' render={() => (
            <TripIndex user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/trips/:id' render={(props) => (
            <TripShow {...props} setTrip={this.setTrip} user={user} msgAlert={this.msgAlert} />
          )} />
        </main>
        < Footer />
      </Fragment>
    )
  }
}

export default App

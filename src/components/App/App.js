import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import Home from '../Home/Home'
import TripCreate from '../CreateTrip/CreateTrip'
import TripIndex from '../IndexTrip/IndexTrip'
import TripShow from '../ShowTrip/ShowTrip'
import GetTide from '../GetTide/GetTide'
import ChangePassword from '../ChangePassword/ChangePassword'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  setTrip = trip => this.setState({ trip })
  clearArt = () => this.setState({ trip: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    console.log('state is:', this.state)
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
          <Route path='/tides' render={() => (<GetTide />)} />
        </main>
        < Footer />
      </Fragment>
    )
  }
}

export default App

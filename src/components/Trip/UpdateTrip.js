import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { getCoords } from '../../api/tides'
import { updateTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { Form, Button } from 'react-bootstrap'
import TripDelete from './DeleteTrip'

class TripUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      launchDate: this.props.trip.launchDate,
      city: this.props.trip.city,
      state: this.props.trip.state,
      edited: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onTripUpdate = event => {
    event.preventDefault()
    const { user, msgAlert, history, match } = this.props
    const id = this.state.city + this.state.state
    getCoords(id, user)
      .then(res => updateTrip(this.state, res.data, match.params.id, user))
      .then(() => {
        msgAlert({
          heading: 'Edit Success',
          message: messages.tripEditSuccess,
          variant: 'success'
        })
        history.push('/trips/')
      })
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.tripEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { launchDate, city, state } = this.state
    return (
      <div>
        <Form onSubmit={this.onTripUpdate}>
          <Form.Group controlId="launchDate">
            <Form.Label className="main">Launch Date</Form.Label>
            <Form.Control
              required
              type="text"
              name="trip start"
              value={launchDate}
              placeholder="Launch Date"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label className="main">City</Form.Label>
            <Form.Control
              required
              type="text"
              name="city"
              value={city}
              placeholder="enter city"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="longitude">
            <Form.Label className="main">State</Form.Label>
            <Form.Control
              required
              type="text"
              name="state"
              value={state}
              placeholder="enter state (no abbreviations!)"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">Update Trip</Button>
        </Form>
        <br></br>
        <TripDelete msgAlert={this.props.msgAlert} user={this.props.user} />
      </div>
    )
  }
}

export default withRouter(TripUpdate)

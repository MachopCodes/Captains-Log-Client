import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { Form, Button } from 'react-bootstrap'

class TripUpdate extends Component {
  constructor (props) {
    super(props)

    console.log('props inside update are:', props)

    this.state = {
      location: this.props.trip.location,
      tripStart: this.props.trip.tripStart,
      tripEnd: this.props.trip.tripEnd,
      edited: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onTripUpdate = event => {
    event.preventDefault()
    const { user, msgAlert, history, match } = this.props
    updateTrip(this.state, match.params.id, user)
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
    console.log('the state in update render is: ', this.state)
    const { location, tripStart, tripEnd } = this.state
    return (
      <div>
        <h3>Edit this trip piece</h3>
        <Form onSubmit={this.onTripUpdate}>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type="text"
              name="location"
              value={location}
              placeholder="location"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tripStart">
            <Form.Label>Trip Start</Form.Label>
            <Form.Control
              required
              type="text"
              name="trip start"
              value={tripStart}
              placeholder="trip start"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tripEnd">
            <Form.Label>Trip End</Form.Label>
            <Form.Control
              required
              type="text"
              name="trip start"
              value={tripEnd}
              placeholder="tripEnd"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            size="sm"
          >
            Edit Trip
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(TripUpdate)

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
      longitude: this.props.trip.longitude,
      launchDate: this.props.trip.launchDate,
      latitude: this.props.trip.latitude,
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
    const { longitude, launchDate, latitude } = this.state
    return (
      <div>
        <Form onSubmit={this.onTripUpdate}>
          <Form.Group controlId="launchDate">
            <Form.Label>Launch Date</Form.Label>
            <Form.Control
              required
              type="text"
              name="trip start"
              value={launchDate}
              placeholder="Launch Date"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              required
              type="text"
              name="trip start"
              value={latitude}
              placeholder="latitude"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="longitude">
            <Form.Label>longitude</Form.Label>
            <Form.Control
              required
              type="text"
              name="longitude"
              value={longitude}
              placeholder="longitude"
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

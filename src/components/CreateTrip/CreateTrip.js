import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { createTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'

class TripCreate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tripStart: '',
      tripEnd: '',
      location: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onTripCreate = event => {
    event.preventDefault()
    const { msgAlert, user, history } = this.props
    console.log('props are: ', this.props)
    createTrip(this.state, user)
      .then(res => {
        this.setState(res.data)
        msgAlert({
          heading: 'Trip Created Successfully',
          message: messages.tripCreateSucceess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        this.setState({
          tripStart: '',
          tripEnd: '',
          location: ''
        })
        console.log(error)
        msgAlert({
          heading: 'Trip Create Failed with error: ' + error.message,
          message: messages.tripCreateFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { tripStart, tripEnd, location } = this.state

    return (
      <div className="row">
        <div className="cool-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Trip</h3>
          <Form onSubmit={this.onTripCreate}>
            <Form.Group controlId="trip start">
              <Form.Label>Start Date?</Form.Label>
              <Form.Control
                required
                type="date"
                name="tripStart"
                value={tripStart}
                placeholder="Enter trip start date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="trip end">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="tripEnd"
                value={tripEnd}
                placeholder="Enter trip end date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                name="location"
                value={location}
                placeholder="Enter destination"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default TripCreate

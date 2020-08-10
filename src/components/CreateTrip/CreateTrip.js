import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { createTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'

class TripCreate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      launchDate: '',
      latitude: '',
      longitude: ''
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
          launchDate: '',
          latitude: '',
          longitude: ''
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
    const { launchDate, latitude, longitude } = this.state

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
                name="launchDate"
                value={launchDate}
                placeholder="Enter trip start date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="trip end">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                required
                type="text"
                name="latitude"
                value={latitude}
                placeholder="Enter trip end date"
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

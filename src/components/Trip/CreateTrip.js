import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { createTrip } from '../../api/trips'
import { getCoords } from '../../api/tides'
// import { createTide } from '../../api/tides'
import messages from '../AutoDismissAlert/messages'

class TripCreate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      city: '',
      state: '',
      launchDate: '',
      latitude: '',
      longitude: '',
      tides: []
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onTripCreate = event => {
    event.preventDefault()
    const { msgAlert, user, history } = this.props
    const id = this.state.city + this.state.state
    getCoords(id, user)
      // .then(res => getTide(res.data.lat, res.data.lng, this.state.launchDate))
      .then(res => {
        // this.setState({ tides: res.data })
        createTrip(res.data, this.state, user)
        // .then(res => {
        //   const tideCaller = []
        //   tideCaller.push(res.data.id, this.state.tides)
        //   createTide(tideCaller, user)
        // })
      })
      .then(() => {
        msgAlert({
          heading: 'Trip Created Successfully',
          message: messages.tripCreateSucceess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        console.log(error)
        this.setState({
          launchDate: '',
          latitude: '',
          longitude: '',
          tides: []
        })
        msgAlert({
          heading: 'Invalid City or State!: ' + error.message,
          message: messages.tripCreateFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { launchDate, city, state } = this.state

    return (
      <section className='section page-section new-trip-image parallax text-light text-center'>
        <div className="container">
          <div className="row">
            <div className="cool-sm-4 col-md-5 mx-auto mt-5">
              <h3 className="main">Create Trip</h3>
              <Form onSubmit={this.onTripCreate}>
                <Form.Group controlId="trip start">
                  <Form.Label className="main">Start Date</Form.Label>
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
                  <Form.Label className="main">City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="city"
                    value={city}
                    placeholder="Enter City"
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
                    placeholder="Enter State (no abbreviations!)"
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
        </div>
      </section>
    )
  }
}

export default TripCreate

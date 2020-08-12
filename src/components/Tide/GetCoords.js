import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { getCoords } from '../../api/tides'

class GetCoords extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      city: '',
      state: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onGetCoords = event => {
    event.preventDefault()
    console.log('state in get coords is: ', this.state)
    const key = this.state.city + this.state.state
    getCoords(key, this.props.user.token)
      .then(res => {
        console.log('response is:', res)
        this.setState(res.data)
      })
      .catch(error => {
        console.log(error)
        this.setState({
          city: '',
          state: '',
          key: ''
        })
      })
  }
  render () {
    const { city, state } = this.state

    return (
      <div className="row">
        <div className="cool-sm-10 col-md-8 mx-auto mt-5">
          <h3 className="main">Get Coords</h3>
          <Form onSubmit={this.onGetCoords}>
            <Form.Group controlId="city">
              <Form.Label className="main">City</Form.Label>
              <Form.Control
                required
                type="city"
                name="city"
                value={city}
                placeholder="enter city"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label className="main">State</Form.Label>
              <Form.Control
                required
                type="state"
                name="state"
                value={state}
                placeholder="state"
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

export default GetCoords

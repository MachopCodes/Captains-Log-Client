import React from 'react'
import { indexTrips } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { ListGroup, Image, Badge } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

class TripIndex extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      trips: null,
      notFound: false
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexTrips(user)
      .then(res => {
        this.setState({
          trips: res.data,
          notFound: false
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          trips: null,
          notFound: true
        })
        msgAlert({
          heading: 'Could not reach server: ' + error.message,
          message: messages.indexTripFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let jsx
    if (this.state.notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (this.state.trips === null) {
      jsx = <p>Loading... </p>
    } else if (this.state.trips.length === 0) {
      jsx = (
        <div>
          <h1 className="main" style={{ textAlign: 'center' }} >None Yet!</h1>
          <Image src="https://www.thoughtco.com/thmb/wM4gvZhIhhUjzWputSnBZFgnuAA=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642334164-5b61ebb946e0fb0025dac934.jpg" />
        </div>
      )
    } else {
      jsx = (
        <ListGroup>
          {this.state.trips.map(trip => {
            return (
              <ListGroup.Item key={trip.id}>
                <h3>
                  <Badge variant="success">Launch Date:</Badge>
                  <Badge variant="danger">{trip.launchDate.substring(5, 10)}</Badge>
                </h3>
                <Link to={`/trips/${trip.id}`}>
                  <h5>{trip.city}, {trip.state}</h5>
                </Link>
                <h6>
                  Coordinates:
                  <Badge variant="secondary"> {trip.longitude} </Badge>
                  <Badge variant="secondary"> {trip.latitude} </Badge>
                </h6>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      )
    }
    return (
      <div>
        <br></br>
        {jsx}
      </div>
    )
  }
}

export default withRouter(TripIndex)

import React from 'react'
import { indexTrips } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { ListGroup } from 'react-bootstrap'
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
      jsx = <p>No trips</p>
    } else {
      jsx = (
        <ListGroup>
          {this.state.trips.map(trip => {
            return (
              <ListGroup.Item key={trip.id}>
                <Link to={`/trips/${trip.id}`}>
                  Trip {trip.id} on {trip.launchDate.substring(5, 10)} at coordinates: {trip.longitude}, {trip.latitude}
                </Link>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      )
    }
    return (
      <div>
        <h3>Trips</h3>
        {jsx}
      </div>
    )
  }
}

export default withRouter(TripIndex)

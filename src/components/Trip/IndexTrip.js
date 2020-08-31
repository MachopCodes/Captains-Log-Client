import React from 'react'
import { indexTrips } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { ListGroup, Button, Badge } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import GetTide from '../Tide/GetTide'

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
    const { notFound, trips } = this.state
    let jsx
    if (notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (trips === null) {
      jsx = <p>Loading... </p>
    } else if (trips.length === 0) {
      jsx = (
        <section className='section page-section index-image parallax text-light text-center'>
          <h1 className="main" style={{ textAlign: 'center' }} >None Yet!</h1>
        </section>
      )
    } else {
      jsx = (
        <section className='section page-section index-image parallax text-light text-center'>
          <div className='container'>
            <div className='row content-center'>
              <ListGroup>
                <div className='col'>
                  {trips.map(trip => {
                    return (
                      <ListGroup.Item key={trip.id}>
                        <h1><Badge variant="warning">{trip.launchDate.substring(5, 10)}</Badge></h1>
                        <h2><Badge variant="dark">{trip.city}, {trip.state}</Badge></h2>
                        <h4>
                          <Badge variant="light">({trip.longitude})</Badge>
                          <Badge variant="light">({trip.latitude})</Badge>
                        </h4>
                        <GetTide user={this.props.user} trip={trip} msgAlert={this.props.msgAlert} />
                        <br></br>
                        <Link to={`/trips/${trip.id}`}><Button variant="success">Edit Trip</Button></Link>
                      </ListGroup.Item>
                    )
                  })}
                </div>
              </ListGroup>
            </div>
          </div>
        </section>
      )
    }
    return jsx
  }
}

export default withRouter(TripIndex)

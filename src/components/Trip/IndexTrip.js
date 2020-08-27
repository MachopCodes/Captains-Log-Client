import React from 'react'
import { indexTrips } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { ListGroup, Image, Badge } from 'react-bootstrap'
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
        <section className='section page-section index-image parallax text-light text-center'>
          <div className='container'>
            <div className='row content-center'>
              <ListGroup>
                <div className='col'>
                  {this.state.trips.map(trip => {
                    return (
                      <ListGroup.Item key={trip.id}>
                        <Link to={`/trips/${trip.id}`}>
                          <h5>{trip.city}, {trip.state}, {trip.launchDate.substring(5, 10)}</h5>
                        </Link>
                        <h6>
                          <Badge variant="secondary"> ({trip.longitude}) </Badge>
                          <Badge variant="secondary"> ({trip.latitude}) </Badge>
                        </h6>
                        <GetTide user={this.props.user} trip={trip} msgAlert={this.props.msgAlert} />
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
    return (
      <div>
        <br></br>
        {jsx}
      </div>
    )
  }
}

export default withRouter(TripIndex)

import React from 'react'
import { showTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { Container, Row, Col } from 'react-bootstrap'
import TripUpdate from './UpdateTrip'

class TripShow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: null,
      notFound: false
    }
  }

  componentDidMount () {
    const { user, msgAlert, match, setTrip } = this.props
    showTrip(match.params.id, user)
      .then(res => {
        this.setState({ trip: res.data, notFound: false })
        setTrip(this.state.trip)
      })
      .catch(error => {
        msgAlert({
          heading: 'Could not find this tirp: ' + error.message,
          message: messages.showTripFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { notFound, trip } = this.state
    let jsx
    if (notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (trip === null) {
      jsx = <p>Loading... </p>
    } else {
      jsx = (
        <section className='section page-section index-image parallax text-light text-center'>
          <div>
            <Container>
              <Row>
                <Col md="auto">
                  <TripUpdate
                    trip={this.state.trip}
                    user={this.props.user}
                    msgAlert={this.props.msgAlert} />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      )
    }
    return jsx
  }
}

export default TripShow

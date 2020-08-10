import React from 'react'
import { showTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'

import TripDelete from '../DeleteTrip/DeleteTrip'
import TripUpdate from '../UpdateTrip/UpdateTrip'
import GetTide from '../GetTide/GetTide'

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
        console.log('showTrip response data is:', res)
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
    this.state.trip && console.log('state.trip.launchDate is: ', this.state.trip.launchDate)
    let jsx
    if (this.state.notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (this.state.trip === null) {
      jsx = <p>Loading... </p>
    } else {
      const { launchDate, latitude, longitude } = this.state.trip
      jsx = (
        <div>
          <p>
            Launch Date {launchDate} at longitude {longitude}, latitude {latitude}
          </p>
          <GetTide trip={this.state.trip} msgAlert={this.props.msgAlert} />
          <TripUpdate trip={this.state.trip} user={this.props.user} msgAlert={this.props.msgAlert} />
          <TripDelete msgAlert={this.props.msgAlert} user={this.props.user} />
        </div>
      )
    }
    return (
      <div>
        <h3>Trip Information</h3>
        {jsx}
      </div>
    )
  }
}

export default TripShow

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deleteTrip } from '../../api/trips'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class TripDelete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      destroyed: false
    }
  }

  onDelete = event => {
    event.preventDefault()
    const { user, history, msgAlert, match } = this.props
    deleteTrip(match.params.id, user)
      .then(() => {
        this.setState({ destroyed: true })
        msgAlert({
          heading: 'Delete Success',
          message: messages.tripDeleteSuccess,
          variant: 'success'
        })
        history.push('/')
      })
      .catch(error => {
        this.setState({ destroyed: false })
        msgAlert({
          heading: 'Failed to delete: ' + error.message,
          message: messages.tripsDeleteFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <Button variant="danger" onClick={this.onDelete}>
        Delete
      </Button>
    )
  }
}

export default withRouter(TripDelete)

import React from 'react'
import { Button, ListGroup, Badge } from 'react-bootstrap'
import { getTide, getKey } from '../../api/tides'

class GetTide extends React.Component {
  constructor (props) {
    super(props)

    this.state = { tides: null }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onGetTide = event => {
    event.preventDefault()
    getKey(this.props.user)
      .then((key) => {
        getTide(this.props.trip, key.data)
          .then((res) => this.setState({ tides: res.data.extremes }))
          .catch((error) => console.log(error))
      })
  }
  render () {
    let jsx
    if (this.state.tides === null) {
      jsx =
      <div><Button onClick={this.onGetTide} variant="primary">Tides</Button></div>
    } else {
      const getTideDate = (tide) => {
        const date = new Date((tide.timestamp + 2750) * 1000)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return (
          <ListGroup.Item>
            <Badge variant={tide.state === 'HIGH TIDE' ? 'success' : 'danger'}>
              {tide.state}
            </Badge>
            <Badge variant='light'>
              {hours}:{minutes < 10 ? '0' + minutes : minutes}
            </Badge>
          </ListGroup.Item>
        )
      }
      jsx =
      <div>
        {this.state.tides.map((tide) => (
          <ListGroup key={tide.timestamp}>
            <h4>{getTideDate(tide)}</h4>
          </ListGroup>
        ))}
      </div>
    }
    return jsx
  }
}

export default GetTide

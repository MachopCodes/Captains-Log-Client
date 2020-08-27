import React from 'react'
import { Button, ListGroup, Badge } from 'react-bootstrap'
import { getTide, getKey } from '../../api/tides'

class GetTide extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tides: null
    }
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
      <div>
        <Button onClick={this.onGetTide}
          variant="info"
          type="submit"
        >
        Tides
        </Button>
      </div>
    } else {
      jsx =
      <div>
        {this.state.tides.map((tide) => (
          <ListGroup key={tide.timestamp}>
            <ListGroup.Item>
              <Badge
                variant={tide.state === 'HIGH TIDE' ? 'success' : 'danger'}>
                {tide.state}
              </Badge>
              <Badge variant='secondary'>
                {tide.datetime.substring(11, 19)}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    }
    return (
      <div>
        <h4 className="main">Tide Table</h4>
        {jsx}
      </div>
    )
  }
}

export default GetTide

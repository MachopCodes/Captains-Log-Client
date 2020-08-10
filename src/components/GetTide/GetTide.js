import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
const key = '0dc5cbc839msh38f20cf1d6694f0p196821jsn4cc0c344b85b'
// import { getTide } from '../../api/tides'
class GetTide extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tides: null
    }
    this.unixTime = Math.floor((new Date(this.props.trip.launchDate)).getTime() / 1000)
  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onGetTide = event => {
    event.preventDefault()
    axios({
      method: 'GET',
      url: 'https://tides.p.rapidapi.com/tides',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'tides.p.rapidapi.com',
        'x-rapidapi-key': key,
        'useQueryString': true
      },
      params: {
        interval: '60',
        timestamp: this.unixTime,
        duration: '1440',
        latitude: this.props.trip.latitude,
        longitude: this.props.trip.longitude
      }
    })
      .then((res) => {
        this.setState({ tides: res.data.extremes })
        res.data.extremes.map((tide) => console.log(tide.state, tide.datetime.substring(11, 19)))
        console.log('new state is:', this.state)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render () {
    let jsx
    if (this.state.tides === null) {
      jsx =
      <div>
        <Button onClick={this.onGetTide}
          variant="primary"
          type="submit"
        >
        Get Tide
        </Button>
      </div>
    } else {
      jsx =
      <div>
        {this.state.tides.map((tide) => (
          <p key={tide.timestamp}>{tide.state} is at {tide.datetime.substring(11, 19)}</p>
        ))}
      </div>
    }
    return (jsx)
  }
}

export default GetTide

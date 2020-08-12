import apiUrl from '../apiConfig'
import axios from 'axios'

export const createTrip = (res, state, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/trips/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      trip: {
        launchDate: state.launchDate,
        latitude: res.lat,
        longitude: res.lng,
        city: res.city,
        state: res.state
      }
    }
  })
}

export const indexTrips = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/trips/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showTrip = (id, user) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/trips/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateTrip = (state, coords, id, user) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/trips/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      trip: {
        launchDate: state.launchDate,
        latitude: coords.lat,
        longitude: coords.lng,
        city: state.city,
        state: state.state
      }
    }
  })
}

export const deleteTrip = (id, user) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/trips/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const createTrip = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/trips/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
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

export const updateTrip = (data, id, user) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/trips/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
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

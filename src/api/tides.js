import axios from 'axios'
import apiUrl from '../apiConfig'

export const getTide = (props, key) => {
  const time = Math.floor((new Date(props.launchDate)).getTime() / 1000)
  return axios({
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
      timestamp: time,
      duration: '1440',
      latitude: props.latitude,
      longitude: props.longitude
    }
  })
}

export const createTide = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/tides/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data
  })
}

export const getKey = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/key/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const getCoords = (id, user) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/coords/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

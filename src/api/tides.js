import axios from 'axios'
const key = '0dc5cbc839msh38f20cf1d6694f0p196821jsn4cc0c344b85b'

export const getTide = () => {
  console.log('inside the axios')
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
      timestamp: '1628467200',
      duration: '1440',
      latitude: '41.0772',
      longitude: '73.4687'
    }
  })
}

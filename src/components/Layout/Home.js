import React from 'react'

const Home = () => {
  const backgroundImageUrl = 'https://cdn.britannica.com/94/101794-050-A98A953E/Lighthouse-Portsmouth-NH.jpg'

  const homeStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    fontSize: '200px',
    color: '#002B4E',
    fontVariant: 'small-caps'
  }

  return (
    <div style={homeStyle}>
      <div>
        <h2>Plan Trips</h2>
        <h2>With</h2>
        <h2>Good Tides</h2>
      </div>
      <div>
        <h1>Captains Log</h1>
      </div>
    </div>
  )
}

export default Home

import React from 'react'
import { Link } from 'react-router-dom'

const backgroundStyle = {
  backgroundColor: '#191919',
  color: 'white',
  height: '100vh'
}

const Footer = () => {

  const style = {
    color: 'white'
  }

  return <footer className="footer" style={backgroundStyle}>
    <div className="container">

      <div className="columns">

        <div className="column is-3">
          <div className="contents">
            <h2 className="title m-5" style={style}>Loose End</h2>
          </div>
          <div className="contents">
            <h4 className="subtitle ml-5 mb-1" style={style}>New People.</h4>
            <h4 className="subtitle ml-5" style={style}>New Places.</h4>
          </div>
        </div>


        <div className="column is-3">
          <div className="contents">
            <h2 className="title mt-5 mb-5" style={style}>Explore</h2>
          </div>
          <div className="contents">
            <Link to={'/'}><h4 className="subtitle is-size-6 mb-1" style={style}>Home</h4></Link>
            <Link to={'/about'}><h4 className="subtitle is-size-6 mb-1" style={style}>About</h4></Link>
            <Link to={'/meetUp'}><h4 className="subtitle is-size-6 mb-1" style={style}>Meet Ups</h4></Link>
            <Link to={'/activities'}><h4 className="subtitle is-size-6 mb-1" style={style}>Restaurants</h4></Link>
            <Link to={'/groups'}><h4 className="subtitle is-size-6 mb-1" style={style}>Groups</h4></Link>
            <Link to={'/poi'}><h4 className="subtitle is-size-6 mb-1" style={style}>Points of Interest</h4></Link>
            <Link to={'/map'}><h4 className="subtitle is-size-6 mb-1" style={style}>Map</h4></Link>
          </div>
        </div>

        <div className="column">
          <div className="contents">
            <h2 className="title mt-5 mb-5" style={style}>Created by</h2>
          </div>
          <div className="contents">
            <h4>Cathy</h4>
            <h4>Jake</h4>
            <h4>Katherine</h4>
            <h4>Ollie</h4>
          </div>
        </div>

        <div className="column">
          <div className="contents">
            <h2 className="title mt-5 mb-5" style={style}>Powered by</h2>
          </div>
          <div className="contents">
            <h4>MongoDB</h4>
            <h4>Express</h4>
            <h4>React</h4>
            <h4>Node.js</h4>
          </div>
        </div>


      </div>
    </div>
    <div className="container footer-bottom has-text-centered">
      <small>2021. Loose End is a group project created as part of General Assembly's Immersive Software Engineering Course. This site is not created for any commercial gain and is not intended for public use. For enquires, please contact <a href="mailto:cathyjthomas.dev@gmail.com">cathyjthomas.dev@gmail.com</a>.</small>
    </div>
  </footer>
}

export default Footer
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getLoggedInUserId } from '../lib/auth.js'
import axios from 'axios'

function Navbar({ history }) {

  const [loggedInUser, updateLoggedInUser] = useState([])

  setTimeout(() => {

    const userId = getLoggedInUserId()

    async function getLoggedInUser() {
      const { data } = await axios.get(`/api/user/${userId}`)
      updateLoggedInUser(data)
    }
    if (userId) {
      getLoggedInUser()
    } else {
      updateLoggedInUser([])
    }
  }, 1000)

  function logout() {
    history.push('/')
    localStorage.removeItem('token')
  }

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to={'/home'}>
        <div className="logo-text">Loose End</div>
      </Link>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">

        <Link className="navbar-item" id="navbar-link-override" to={'/'}>
          Home
        </Link>

        {!loggedInUser._id &&
          <Link className="navbar-item" id="navbar-link-override" to={'/meetUpSearch'}>
            Meet ups
          </Link>}
        {loggedInUser._id &&
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link is-arrowless" id="navbar-link-override">
              MeetUps
            </a>
            <div className="navbar-dropdown">
              <Link className="navbar-item" to={'/meetUpSearch'}>
                Search MeetUps
              </Link>
              <Link className="navbar-item" to={'/createMeetUp'}>
                Create MeetUp
              </Link>
            </div>
          </div>}
        {!loggedInUser._id &&
          <Link className="navbar-item" id="navbar-link-override" to={'/groups'}>
            Groups
          </Link>}
        {loggedInUser._id &&
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link is-arrowless" id="navbar-link-override">
              Groups
            </a>
            <div className="navbar-dropdown">
              <Link className="navbar-item" to={'/groups'}>
                Find Group
              </Link>
              <Link className="navbar-item" to={'/groups/create-group'}>
                Create Group
              </Link>
            </div>
          </div>}
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link is-arrowless" id="navbar-link-override">
            Activities
          </a>
          <div className="navbar-dropdown">
            <Link className="navbar-item" to={'/map'}>
              Activity Map
            </Link>
            <Link className="navbar-item" to={'/activities/food-and-drink'}>
              Food & Drink
            </Link>
            <Link className="navbar-item" to={'/poi'}>
              Places to visit
            </Link>
          </div>
        </div>
        <Link className="navbar-item" id="navbar-link-override" to={'/about'}>
          About
        </Link>
      </div>

      <div className="navbar-end">

        {loggedInUser._id &&
          <div className="navbar-item">
            <div className="navbar-item has-dropdown is-hoverable">
              <figure className="image is-32x32">
                <img className="is-rounded" src={loggedInUser.image} />
              </figure>
              <div className="control-row">
                <p className="bold-text ml-2">{loggedInUser.firstName}</p>
                <a className="navbar-link is-arrowless" id="navbar-link-override"></a>
              </div>
              <div className="navbar-dropdown">
                <p className="navbar-item bold-text">{loggedInUser.firstName + ' ' + loggedInUser.lastName}</p>
                <Link className="navbar-item" to={`/profile/${loggedInUser._id}`}>
                  Profile
                </Link>
                <Link className="navbar-item" to={`/inbox/${loggedInUser._id}`}>
                  Messages
                </Link>
              </div>
            </div>
          </div>}
        <div className="navbar-item">
          <div className="buttons">
            {loggedInUser.length === 0 &&
              <Link className="button is-yellow-button" to={'/login'}>
                Log in
              </Link>}
            {loggedInUser.length === 0 &&
              <Link className="button is-light" to={'/register'}>
                <strong>Sign up</strong>
              </Link>}
            {loggedInUser._id &&
              <button className="button is-warning" onClick={logout}>Sign Out</button>}
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default withRouter(Navbar)

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RandomRestaurant from './RandomEvent.js'
import RandomMeetUp from './RandomMeetUp.js'
import RandomPoi from './RandomPoi.js'
import MeetUpSearchForm from './MeetUpSearchForm'

import logo from '../images/logo.png'
import pin from '../images/pin.png'
import edition from '../images/edition.png'
import pages from '../images/pages.png'

const Home = () => {


  const [formData, updateFormData] = useState({
    location: '',
    date: new Date().toISOString().substr(0, 10),
    category: 'All Categories'
  })


  const pinStyle = {
    width: '50px'
  }


  return <main>

    {
      // * LOGO SECTION
    }

    <section className="section">
      <div className="columns">
        <div className="column"></div>

        <div className="column is-two-thirds">
          <div className="columns">
            <div className="column">
              <div className="content">
                <div className="logo-container">
                  <img src={logo} />
                </div>
                <div className="logo-container">
                  <p className="title-style">Loose End</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="tagline-container">
                <h2 className="title is-size-1 mb-1">New People.</h2>
                <h2 className="title is-size-1 mt-1">New Places.</h2>
                <button className="register-button"><Link id="button-link" to={'/register'}>Sign Up</Link></button>
              </div>
            </div>
          </div>
          <div className="home-page-search-section">
            <p className="title is-4 mb-1 bold-text">Search meet ups now</p>
            <div className="home-page-searchbar">
              <MeetUpSearchForm orientation="meetUpSearchRow"
                formData={formData}
                updateFormData={updateFormData} />
            </div>
            <div className="has-text-centered mt-2">
              <Link to={'/meetUpSearch'} className="homepage-link">Meet Ups <span style={{ color: 'lightgray' }}>|</span></Link>
              <Link to={'/activities/food-and-drink'} className="homepage-link">Restaurants <span style={{ color: 'lightgray' }}>|</span></Link>
              <Link to={'/groups'} className="homepage-link">Groups <span style={{ color: 'lightgray' }}>|</span></Link>
              <Link to={'/poi'} className="homepage-link">Points of Interest</Link>
            </div>
          </div>
        </div>

        <div className="column"></div>
      </div>
    </section>


    {
      // * MEET-UP SECTION
    }

    <section className="section yellow-section">
      <div className="container">

        <div className="level">
          <div className="level-left">
            <div>
              <p className="title">At a loose end?</p>
              <p className="subtitle">Check out upcoming meet ups in London, UK</p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link to={'/meetUpSearch'} className="button">See all</Link>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <RandomMeetUp />
          </div>
          <div className="column">
            <RandomMeetUp />
          </div>
          <div className="column">
            <RandomMeetUp />
          </div>
          <div className="column">
            <RandomMeetUp />
          </div>
        </div>
      </div>
    </section>

    {
      // * MISSON STATEMENT SECTION
    }

    <section className="section gray-section">
      <div className="container">
        <div className="columns">
          <div className="column centered-column">
            <div className="mission-statement">
              <img src={pages} style={pinStyle} />
              <h2 className="is-size-4"><strong>Sign Up</strong></h2>
              <h4 className="has-text-centered">A Loose End account is your passport to what’s happening in the world. Sign up to find local hidden gems and meet great people along the way.</h4>
            </div>
          </div>
          <div className="column centered-column">
            <div className="mission-statement">
              <img src={pin} style={pinStyle} />
              <h2 className="is-size-4"><strong>Browse</strong></h2>
              <h4 className="has-text-centered">Browse the great selection of meetups, local hotspots and things to do. You're only one click away from your next adventure.</h4>
            </div>
          </div>
          <div className="column centered-column">
            <div className="mission-statement">
              <img src={edition} style={pinStyle} />
              <h2 className="is-size-4"><strong>Create</strong></h2>
              <h4 className="has-text-centered">Feeling at a Loose End? Create your own meet ups, points of interests and groups. </h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    {
      // * RESTAURANT SECTION
    }

    <section className="section">
      <div className="container">

        <div className="level">
          <div className="level-left">
            <div>
              <p className="title">Eating and drinking</p>
              <p className="subtitle">Our recommendations for you in London, UK</p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link to={'/activities/food-and-drink'} className="button">See all</Link>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <RandomRestaurant />
          </div>
          <div className="column">
            <RandomRestaurant />
          </div>
          <div className="column">
            <RandomRestaurant />
          </div>
          <div className="column">
            <RandomRestaurant />
          </div>
        </div>
      </div>
    </section>

    {
      // * POI SECTION
    }

    <section className="section yellow-section">
      <div className="container">

        <div className="level">
          <div className="level-left">
            <div>
              <p className="title">Get out and about</p>
              <p className="subtitle">Our recommendations for you in London, UK</p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link to={'/poi'} className="button">See all</Link>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <RandomPoi />
          </div>
          <div className="column">
            <RandomPoi />
          </div>
          <div className="column">
            <RandomPoi />
          </div>
          <div className="column">
            <RandomPoi />
          </div>
        </div>
      </div>
    </section>

  </main>
}

export default Home
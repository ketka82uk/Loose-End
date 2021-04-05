import React, { useState, useEffect } from 'react'
import MeetUpSearchForm from './MeetUpSearchForm'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import { getLoggedInUserId } from '../lib/auth'
import Moment from 'react-moment'

const MeetUpSearch = () => {
  const [meetUps, updateMeetUps] = useState([])
  const [loading, updateLoading] = useState(true)
  const [formData, updateFormData] = useState({
    location: '',
    date: new Date().toISOString().substr(0, 10),
    category: 'All Categories'
  })
  const [numberOfMeetUps, updateNumberOfMeetUps] = useState(0)
  const loggedIn = getLoggedInUserId()

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/meetUps/')
      updateMeetUps(data)
      updateLoading(false)
      updateNumberOfMeetUps(data.length)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }



  return <div>


    {/*
    // * TITLE SECTION
    */}

    <section className="hero yellow-section">
      <div className="hero-body">
        <p className="title">
          Meet ups
        </p>
        <p className="subtitle">
          Looking to connect with others somewhere new? Search meet ups below.
        </p>
      </div>
    </section>

    {/*
    // * LEVEL SECTION
    */}



    <section className="gray-section py-2">
      <div className="container">

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{numberOfMeetUps}</strong> meet ups
              </p>
            </div>
            <div className="level-item">
              <MeetUpSearchForm orientation="meetUpSearchRow" formData={formData} updateFormData={updateFormData} />
            </div>
          </div>

          {loggedIn && <div className="level-right">
            <div className="level-item">
              <div className="subtitle">Nothing around?</div>
            </div>
            <div className="level-item">
              <div className="is-link is-warning is-light subtitle"><Link to='/activities/create-restaurant'>Create your own meet up!</Link></div>
            </div>
          </div>}

        </div>
      </div>
    </section>

    {/*
    // * MEET-UP LIST SECTION
    */}

    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {meetUps.map((meetUp) => {
            const meetUpDescription = meetUp.description.split('')
            const descriptionString = meetUpDescription.join('')
            return <div className="column is-one-quarter" key={meetUp._id}>
              <Link to={`/meetUp/${meetUp._id}`}>
                <div className='card meetup-card'>
                  <div className="card-image">
                    <figure className="image is-3by2">
                      <img src={meetUp.image} />
                    </figure>
                  </div>
                  <div className="card-content py-2 px-2">
                    <div className="media-content">
                      <p className="title is-5">{meetUp.name}
                      </p>
                    </div>
                    <div className="content">
                      <p className="subtitle is-6"><Moment format="DD MMMM, YYYY">{meetUp.date}</Moment></p>
                    </div>
                    <div className="content">
                      <p className="description-text mt-2 mr-2">{descriptionString.length >= 150
                        ? descriptionString.slice(0, 150) + '...'
                        : descriptionString
                      }
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>
  </div >
}

export default MeetUpSearch
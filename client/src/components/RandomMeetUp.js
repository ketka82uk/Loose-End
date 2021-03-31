import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import Moment from 'react-moment'


function RandomMeetUp() {
  const [event, updateEvent] = useState([])
  const [loading, updateLoading] = useState(true)

  function random() {
    return Math.floor(Math.random() * event.length)
  }
  const num1 = random()

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/meetUps')
      updateEvent(data)
      updateLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }


  return <Link to={`/meetUp/${event[num1]._id}`}>
    <div className="card homepage-card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={event[num1].image} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{event[num1].name}</p>
            <p className="subtitle is-6"><Moment format="DD MMMM, YYYY">{event[num1].date}</Moment></p>
          </div>
        </div>
      </div>
    </div>
  </Link >
}

export default RandomMeetUp
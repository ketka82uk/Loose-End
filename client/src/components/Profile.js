import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RingLoader from 'react-spinners/RingLoader'
import { Link } from 'react-router-dom'

const Profile = () => {

  const _id = '6033ed185f5f1931b109cb1f'
  const token = localStorage.getItem('token')
  console.log(token)

  const [profile, updateProfile] = useState([])
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/user/${_id}`)
      updateProfile(data)
      console.log(data)
      updateLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'#fbbc04'} />
    </div>
  }

  function handleDelete() {
    axios.delete(`/api/user/${_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateProfile(resp.data)
      })
  }

  return <div className="m-4">
    <div className="title is-size-1 m-6">
      <h1>Welcome back {profile.firstName}</h1>
    </div>
    <div className="columns has-text-centered ">
      <div className="column is-one-third p-0 mt-3 mb-3 ml-3">
        <div>
          <div className="card" >
            <div className="card-image">
              <figure className="image is-3by3">
                <img src={profile.image} alt="Profile photo" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <h2 className="title is-4">{profile.firstName}</h2>
                  <h3 className="subtitle is-4">{profile.lastName}</h3>
                </div>
              </div>

              <div className="content">
                <h4>Age: {profile.age}</h4>
                <h4>Location: {profile.homeTown}</h4>
              </div>
            </div>
          </div>
          <div className="card mt-3" >
            <div className="card-content has-text-centered">
              <Link className="button is-warning m-1" to={'/updateProfile'}>Update Profile</Link>
              <button
                className="button is-danger m-1"
                onClick={handleDelete}
              >
                Delete Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="column is-two-thirds p-0 mt-3 mb-3 ml-2">
        <div className="card mb-2">
          <h2 className="subtitle mt-2">Events Attended</h2>
          <div className="columns m-2">
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="subtitle mt-2">Upcoming Events</h2>
          <div className="columns m-2">
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
          </div>
        </div>
        <div className="card mt-2 mb-2">
          <h2 className="subtitle mt-2">Events Created</h2>
          <div className="columns m-2">
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
            <div className="card m-2 column">
              <img src={profile.image} />
              <h4>{profile.firstName}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="m-3">
        <h2 className="subtitle">User Reviews</h2>
        <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Make a comment.."
                //onChange={event => setText(event.target.value)}
                //value={text}
                >
                </textarea>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  //onClick={handleComment}
                  className="button is-info"
                >
                  Submit
                </button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
}

export default Profile
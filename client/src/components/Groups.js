import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

const Groups = ({ history }) => {
  const [groupsData, updateGroupsData] = useState([])
  const [inputValue, updateInputValue] = useState('')
  const [passcodeMatch, updatePasscodeMatch] = useState(false)
  const [passcodeSubmit, updatePasscodeSubmit] = useState(false)
  const loggedIn = getLoggedInUserId()

  useEffect(() => {
    axios.get('/api/groups')
      .then(resp => {
        updateGroupsData(resp.data)
      })
  }, [])


  function handleSubmit(event) {
    event.preventDefault()
    updatePasscodeSubmit(true)
    try {
      groupsData.map((group) => {
        if (group.passcode === inputValue) {
          updatePasscodeMatch(true)
          history.push(`/groups/${group._id}`)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  function NoPasscodeMatch() {
    if (passcodeSubmit && !passcodeMatch) {
      return <div className="size-is-5">Oh no, we couldn't find your group! Please check your passcode.</div>
    } else {
      return null
    }
  }


  function handleChange(input) {
    updateInputValue(input.target.value)
  }

  return <div>

    {/*
    // * TITLE SECTION
    */}

    <section className="hero yellow-section">
      <div className="hero-body">
        <p className="title">
          Groups
        </p>
        <p className="subtitle">
          Explore new places, together!
        </p>
      </div>
    </section>

    {/*
    // * LEVEL SECTION
    */}

    <section className="gray-section">


      <div className="container mb-4">

        <div className="level mt-2">
          <div className="level-left"></div>
          {loggedIn && <div className="level-right">
            <div className="level-item">
              <div className="subtitle">No group to join?</div>
            </div><div className="level-item">
              <div className="is-link is-warning is-light subtitle"><Link to='/groups/create-group'>Add your own</Link></div>
            </div>
          </div>}
        </div>

      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <div className="section">
      <div className="columns">
        <div className="column"></div>


        <div className="column is-two-thirds">
          <div className="card">
            <div className="card-content">

              <div className="content">
                <h1 className="title">Join your people!</h1>
                <p className="is-size-5">Loose End Groups lets you create meet-ups only with others from your network.</p>
                <p className="is-size-5">If you have been invited to join a group, enter your unique group passcode below to access the group page.</p>
              </div>
              <div className="content">
                <div className="field">
                  <label className="label"></label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter group passcode"
                      onChange={handleChange}
                      value={inputValue}></input>
                  </div>
                </div>
                <div className="content">
                  <button className="button is-yellow-button" onClick={handleSubmit}>Submit</button>
                  <NoPasscodeMatch />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column"></div>
      </div>
    </div>
  </div>

}

export default Groups
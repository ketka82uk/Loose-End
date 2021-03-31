import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId, isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';


export default function SingleGroup({ match, history }) {
  const groupId = match.params.groupId
  const [group, updateGroup] = useState({})
  const [user, updateUser] = useState({})
  const [members, updateMembers] = useState([])
  const [loading, updateLoading] = useState(true)
  const [isNotJoined, updateIsNotJoined] = useState(true)
  //const [commentText, setCommentText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchGroup() {
      try {
        const { data } = await axios.get(`/api/groups/${groupId}`)
        updateGroup(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchGroup()
  }, [])

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const { data } = await axios.get(`/api/user/${getLoggedInUserId()}`)
        updateUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data } = await axios.get(`/api/groups/${groupId}`)
        const memberArray = data.members
        updateMembers(memberArray)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchMembers()
  }, [])


  async function handleUserJoin() {
    const newGroup = user.groups.concat(groupId)
    await axios.put(`/api/user/${user._id}`, { groups: newGroup }, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async function handleUserLeave() {
    console.log(user.groups)
    if (user.groups.includes(group._id)) {
      const groupToRemove = user.groups.findIndex(group => group === group._id)
      await axios.put(`/api/user/${user._id}`, { groups: user.groups.splice(groupToRemove, 1) }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
  }

  async function handleGroupJoin() {
    const newMember = group.members.concat(user)
    await axios.put(`/api/groups/join-group/${groupId}`, { members: newMember })
  }


  async function handleGroupLeave() {

    if (group.members.filter(member => member._id === user._id)) {
      const memberToRemove = group.members.findIndex(member => member._id === user._id)
      const newGroup = group.members
      newGroup.splice(memberToRemove, 1)
      await axios.put(`/api/groups/join-group/${groupId}`, { members: newGroup })
    }
  }

  async function handleDelete() {
    await axios.delete(`/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/')
  }

  function GroupAvatars() {
    return (
      <AvatarGroup max={4}>
        {group.members.map((member) => {
          return <Avatar alt={member.firstName} key={member._id} src={member.image} />
        })}
      </AvatarGroup>
    )
  }


  // {group.members.map((member) => {
  //   return <div className="column is-one-quarter" key={member._id}>
  //     <Link key={member.name} to={{
  //       pathname: `/profile/${member._id}`
  //     }}>
  //       <div className="card">
  //         <div className="card-image">
  //           <figure className="image is-4by3">
  //             <img src={member.image} />
  //           </figure>
  //         </div>
  //         <div className="card-content">
  //           <div className="content">
  //             <h2 className="title is-3">{member.firstName}</h2>
  //             <h2 className="subtitle">{member.lastName}</h2>
  //           </div>
  //         </div>
  //       </div>
  //     </Link>
  //   </div>
  // })}






  if (loading) {
    return <h1>Loading</h1>
  }




  return <div className="main">

    {/*
    // * HERO SECTION
    */}

    <section className="hero is-medium is-link restaurant-hero"
      style={{
        backgroundImage: `url(${group.image})`,
        backgroundSize: 'cover'
      }}>
      <div className="hero-body restaurant-hero">
        <p className="title is-1 restaurant-hero-text">
          {group.name}
        </p>
      </div>
    </section>

    <div className="container">

      {/*
    // * LEVEL SECTION
    */}

      <div className="level mt-2">
        <div className="level-left">
          <div className="level-item">
            {!group.members.includes(user) && <button className="button is-warning" onClick={handleUserJoin, handleGroupJoin}>Join group</button>}
          </div>
          <div className="level-item">
            {group.members.includes(user) && <button className="button is-warning" onClick={handleGroupLeave, handleUserLeave}>Leave group</button>}
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {(isCreator(group.creator._id) || user.admin)
              && <button
                className="button is-danger"
                onClick={handleDelete}
              >Delete {group.name}</button>}
          </div>
          <div className="level-item">
            {(isCreator(group.creator._id) || user.admin)
              && <Link
                to={`/groups/update-group/${group._id}`}
                className="button is-danger"
              >Update {group.name}</Link>}
          </div>
        </div>
      </div>

      {/*
    // * BODY SECTION
    */}

      <div className="columns">

        <div className="column">

          <div className="card group-image"
            style={{
              backgroundImage: `url(${group.image})`,
              backgroundSize: 'cover'
            }}>
            <div className="card-content">
              <div className="content">
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="content">
                <p className="is-size-4">Your group host is
                  <span className="title is-3"> {group.creator.firstName} {group.creator.lastName}</span></p>
              </div>
              <div className="content">
                <div className="section-row">
                  <div>
                    <img src={group.creator.image} height="100px"
                      style={{
                        height: '100px'
                      }}></img>
                  </div>
                  <div className="creator-description ml-2">
                    <p className="is-size-5 my-1">
                      <span className="has-text-weight-semibold">Hometown:</span> {group.creator.homeTown}</p>
                    <p className="is-size-5 my-1">
                      <span className="has-text-weight-semibold">Age:</span> {group.creator.age}</p>
                    <p className="is-size-5 my-1">
                      <span className="has-text-weight-semibold">Interests:</span> {group.creator.interests}</p>
                  </div>
                </div>
              </div>
              <div className="content">
                <button className="button is-warning">Contact {group.creator.firstName}</button>
              </div>
              <div className="content">
                {(isCreator(group.creator._id) || user.admin)
                  && <div className="is-size-4">Hello, {group.creator.firstName}! Your group passcode is: <span className="has-text-danger"> {group.passcode}</span></div>}
              </div>
            </div>
          </div>
        </div>

        <div className="column is-two-thirds">

          <div className="card">
            <div className="card-content">
              <div className="content">
                <h2 className="title is-3">About {group.name}</h2>
                <p className="is-size-4">{group.description}</p>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-content">
              <div className="content">
                <h2 className="title is-3">Group Members</h2>

                <GroupAvatars />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/*
    // * MEET-UP SECTION
    */}

    <section className="hero is-warning my-4">
      <div className="hero-body">
        <div className="container">
          <h2 className="title">Get together!</h2>
          <h2 className="subtitle">Loose End meet-ups organised by {group.name}</h2>
          <div className="button is-danger">Create meetup for {group.name}</div>

          <div className="scrolling-wrapper">

            <div className="scrolling-card-small card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={group.image} />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h2 className="title is-3">{group.name}</h2>
                  <h2 className="subtitle">Meet-up</h2>
                </div>
              </div>
            </div>
            <div className="scrolling-card-small card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={group.image} />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h2 className="title is-3">{group.name}</h2>
                  <h2 className="subtitle">Meet-up</h2>
                </div>
              </div>
            </div>
            <div className="scrolling-card-small card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={group.image} />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h2 className="title is-3">{group.name}</h2>
                  <h2 className="subtitle">Meet-up</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="container">

      {/*
        // * COMMENTS SECTION
      */}

      <section className="section">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h2 className="title is-3">{group.name} Message Board</h2>
              <p className="subtitle is-5">Start the conversation!</p>
            </div>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    placeholder="Make a comment.."
                  >
                  </textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    className="button is-warning">Submit</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  </div>
}
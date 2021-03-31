import MeetUps from '../models/meetUps.js'
import Restaurant from '../models/restaurants.js'
import mongoose from 'mongoose'

async function getAllMeetUps(_req, res, next) {
  try {
    const MeetUpList = await MeetUps.find().populate('user')
    res.send(MeetUpList)
  } catch (err) {
    next(err)
  }
}

async function getMeetUpsByLD(req, res, next) {
  const location = req.params.location
  const date = req.params.date
  try {
    const meetUpsList = await MeetUps.find({location: location, date: new Date(date)}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function getMeetUpsByLDC(req, res, next) {
  const {location, category, date} = req.params
  try {
    const meetUpsList = await MeetUps.find({location: location, tags: category, date: date}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function postMeetUp(req, res, next) {
  const body = req.body
  body.creator = req.currentUser
  try {
    const newMeetUp = await MeetUps.create(body)
    res.status(201).send(newMeetUp)
  } catch (err) {
    next(err)
  }
}

async function getSingleMeetUp(req, res, next) {
  const id = req.params.meetUpId
  try {
    const meetUp = await MeetUps.findById(id).populate('creator').populate('restaurantSuggestions').populate('poiSuggestions') .populate('comments.user')                                        
    res.send(meetUp)
  } catch (err) {
    next(err)
  }
}

async function getSingleMeetUpUpdate(req, res, next) {
  const id = req.params.meetUpId
  try {
    const meetUp = await MeetUps.findById(id).populate('creator').populate('comments.user')                                        
    res.send(meetUp)
  } catch (err) {
    next(err)
  }
}

async function deleteMeetUp(req, res, next) {
  const id = req.params.meetUpId
  const currentUser = req.currentUser
  try {
    const meetUpToDelete = await MeetUps.findById(id)
    if (!currentUser._id.equals(meetUpToDelete.creator)) {
      return res.status(401).send({message: 'Unauthorized Access'})
    }
    await meetUpToDelete.deleteOne()
    res.send(meetUpToDelete)
  } catch (err) {
    next(err)
  }
}

async function updateMeetUp(req, res, next) {
  const id = req.params.meetUpId
  const body = req.body
  const currentUser = req.currentUser
  try {
    const meetUpToUpdate = await MeetUps.findById(id)
    if (!meetUpToUpdate) {
      return res.status(404).send({message: 'MeetUp Not Found'})
    }
    if (!currentUser._id.equals(meetUpToUpdate.creator)) {
      return res.status(401).send({message: 'Unauthorized Access'})
    }
    meetUpToUpdate.set(body)
    meetUpToUpdate.save()
    res.send(meetUpToUpdate)
  } catch (err) {
    next(err)
  }
}

async function makeComment(req, res, next) {
  const commentData = req.body
  const meetUpId = req.params.meetUpId
  commentData.user = req.currentUser

  try {
    const meetUp = await MeetUps.findById(meetUpId).populate('creator').populate('restaurantSuggestions').populate('poiSuggestions') .populate('comments.user')
    if (!meetUp) {
      return res.status(404).send({ message: 'MeetUp not found' })
    }

    meetUp.comments.push(commentData)

    const savedMeetUp = await meetUp.save()

    res.send(savedMeetUp)

  } catch (err) {
    next(err)
  }
}

async function deleteComment(req, res, next) {
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId, meetUpId } = req.params

  try {
    const meetUp = await MeetUps.findById(meetUpId).populate('creator').populate('restaurantSuggestions').populate('poiSuggestions') .populate('comments.user')

    if (!meetUp) {
      return res.status(404).send({ message: 'MeetUp not found' })
    }

    const comment = meetUp.comments.id(commentId)

    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized, this is not your comment to change' })
    }

    comment.remove(commentData)

    const removedMeetUp = await meetUp.save()

    res.send(removedMeetUp)

  } catch (err) {
    next(err)
  }
}

export default {
  getAllMeetUps,
  getMeetUpsByLD,
  getMeetUpsByLDC,
  postMeetUp,
  getSingleMeetUp,
  getSingleMeetUpUpdate,
  deleteMeetUp,
  updateMeetUp,
  makeComment,
  deleteComment
}
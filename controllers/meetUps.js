import MeetUps from '../models/meetUps.js'
import Restaurant from '../models/restaurants.js'
import mongoose from 'mongoose'

async function getMeetUpsByL(req, res, next) {
  const location = req.params.location
  try {
    const meetUpsList = await MeetUps.find({location: location}).populate('creator')
    res.send(meetUpsList)
  } catch (err) {
    next(err)
  }
}

async function getMeetUpsByLC(req, res, next) {
  const {location, category} = req.params
  try {
    const meetUpsList = await MeetUps.find({location: location, category: category}).populate('creator')
    res.send(meetUpsList)
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

async function getMeetUpsByLCD(req, res, next) {
  const {location, category, date} = req.params
  try {
    const meetUpsList = await MeetUps.find({location: location, category: category, date: date}).populate('creator')
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

export default {
  getMeetUpsByL,
  getMeetUpsByLC,
  getMeetUpsByLD,
  getMeetUpsByLCD,
  postMeetUp,
  getSingleMeetUp,
  deleteMeetUp,
  updateMeetUp
}
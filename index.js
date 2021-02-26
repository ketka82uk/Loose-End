import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import connectToDb from './lib/connectToDb.js'
import errorHandler from './middleware/errorHandler.js'
import { port } from './config/environment.js'
import dotenv from 'dotenv'
import path from 'path'
const __dirname = path.resolve()
const dist = path.join(__dirname, 'dist')

dotenv.config()

const app = express()

async function startServer() {
  
  await connectToDb()
  app.use(express.json())
  app.use(logger)
  app.use('/api', router)
  app.use(errorHandler)
  app.use('/', express.static(dist))

  app.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})
  app.listen(port, () => console.log(`Up and running on port ${port}`))
}

startServer()

export const env = process.env

export default app

// This is the index
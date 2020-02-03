const express = require("express")
const http = require('http')
const app = express()
const logfmt = require("logfmt")
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const socket = require('socket.io')

const { omitKeyInArray } = require('./utils/base')
const getFileList = require('./src/getFileList')

const dbAPIRouter = require('./router/db')

const PORT = 5005
let latestFileIndex = -1
let latestFileIndexTimeStamp = 0

// Init File list data
const directoryPath = path.join(__dirname, '/pdfs/')
let fileList = getFileList(directoryPath)
let fileListWithoutPath = omitKeyInArray(fileList, 'path')


// LOG & CORS
app.use(logfmt.requestLogger())
// app.use(cors())

app.get('/api/pdffile', (req, res) => {
  const path = fileList[req.query.index].path
  const file = fs.readFileSync(path)
  res.contentType("application/pdf")
  res.send(file)
})

app.get('/api/reloadfilelist', (req, res) => {
  fileList = getFileList(directoryPath)
  fileListWithoutPath = omitKeyInArray(fileList, 'path')
  res.json({ message: 'File list update successed.' })
})

app.get('/api/filelist', (req, res) => {
  res.json(fileListWithoutPath)
})


// API ROUTER
const reactUrlPath = ['/', '/viewer', '/filelist', '/songlist']
app.use(express.static(path.join(__dirname, '/client/build')))
app.get(reactUrlPath, (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.use(express.json())
app.use('/api', dbAPIRouter)


const port = Number(process.env.PORT || PORT)
const server = http.Server(app).listen(port, () => {
  console.log("Listening on " + port)
})

const io = socket(server)

io.on('connection', socket => {
  console.log('success connect!')
  socket.on('getLatestFileIndex', () => {
    socket.emit('getLatestFileIndex', latestFileIndex, latestFileIndexTimeStamp)
  })
  socket.on('getPDFFile', fileIndex => {
    latestFileIndex = fileIndex
    latestFileIndexTimeStamp = new Date().getTime()
    io.sockets.emit('getPDFFile', fileIndex)
  })
  socket.on('fileLoad', message => {
    socket.broadcast.emit('fileLoad', message)
  })
})

const express = require("express")
const http = require('http')
const app = express()
const logfmt = require("logfmt")
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const socket = require('socket.io')

const { isLocalMode, getNowTime, getFileListForClient } = require('./utils/base')
const getFileList = require('./src/getFileList')
const { SOCKET_EVENT } = require('./constants/index')

const PORT = 5005
let nodeAPIMode
let latestFile = { index: -1, timeStamp: 0 }

// Init File list data
const directoryPath = path.join(__dirname, '/pdfs/')
let fileList = getFileList(directoryPath)
// To Reduce json file size (for client only)
let fileListForClient = getFileListForClient(fileList)


// LOG
app.use(logfmt.requestLogger())

// Enable Parse json body
app.use(express.json())

// API ROUTE
if (isLocalMode()) {
  app.use(cors())
  nodeAPIMode = 'LOCAL'
} else {
  app.use('/api', require('./router/db'))
  nodeAPIMode = 'PRODUCTION'
}

app.get('/api/pdffile', (req, res) => {
  const path = fileList[req.query.index].path
  const file = fs.readFileSync(path)
  res.contentType("application/pdf")
  res.send(file)
})

app.get('/api/reloadfilelist', (req, res) => {
  fileList = getFileList(directoryPath)
  fileListForClient = getFileListForClient(fileList)
  res.json({ message: 'File list update successed.' })
})

app.get('/api/filelist', (req, res) => {
  res.json(fileListForClient)
})


// VIEW ROUTE
const reactUrlPath = ['/', '/viewer', '/filelist', '/songlist']
app.use(express.static(path.join(__dirname, '/client/build')))
app.get(reactUrlPath, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = Number(process.env.PORT || PORT)
const server = http.Server(app).listen(port, () => {
  console.log(`Listening on port ${port}, "${nodeAPIMode}" mode`)
})

// Socket
const io = socket(server)

io.on('connection', socket => {
  socket.on('viewerStatus', status => {
    const { VIEWER_STATUS } = SOCKET_EVENT
    switch (status) {
      case VIEWER_STATUS.PDF_LOAD_SUCCESS:
        socket.broadcast.emit('viewerStatus', VIEWER_STATUS.PDF_LOAD_SUCCESS)
        break
    }
  })
  socket.on('fileIndex', message => {
    // message = { action, index }
    const { FILE_INDEX } = SOCKET_EVENT
    switch (message.action) {
      case FILE_INDEX.SET_FILE_INDEX:
        Object.assign(
          latestFile,
          { index: message.index, timeStamp: getNowTime() }
        )
        io.sockets.emit('fileIndex', latestFile)
        break
      case FILE_INDEX.GET_FILE:
        io.sockets.emit('fileIndex', latestFile)
        break
    }
  })
  socket.on('pageActions', action => {
    const { PAGE_ACTIONS } = SOCKET_EVENT
    switch (action) {
      case PAGE_ACTIONS.SET_NEXT_PAGE:
        socket.broadcast.emit('pageActions', PAGE_ACTIONS.SET_NEXT_PAGE)
        break
      case PAGE_ACTIONS.SET_PREV_PAGE:
        socket.broadcast.emit('pageActions', PAGE_ACTIONS.SET_PREV_PAGE)
        break
    }
  })
})

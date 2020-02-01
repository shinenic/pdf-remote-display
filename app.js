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

const PORT = 5005

// Init File list data
const directoryPath = path.join(__dirname, '/pdfs/')
let fileList = getFileList(directoryPath)
let fileListWithoutPath = omitKeyInArray(fileList, 'path')

// 到時候不用傳全部KEY給CLIENT
// const songSearchAPIRouter = require('./router/api')
// const indexRouter = require('./router/index')
// const searchRouter = require('./router/search')

// LOG & CORS
app.use(logfmt.requestLogger())
app.use(cors())

app.get('/', (req, res) => {
  res.send(`PDF REMOTE DISPLY now on port ${PORT}`)
})

app.get('/pdf', (req, res) => {
  const path = fileList[req.query.index].path
  const file = fs.readFileSync(path)
  res.contentType("application/pdf")
  res.send(file)
})

app.get('/download', (req, res) => {
  const file = fs.readFileSync('./pdfs/歌譜/卓著-最新排行榜/ln012/情非得已_周華健(012_137).pdf')
  res.contentType("application/pdf")
  res.send(file)
})

app.get('/reloadfilelist', (req, res) => {
  fileList = getFileList(directoryPath)
  fileListWithoutPath = omitKeyInArray(fileList, 'path')
  res.json({ message: 'File list update successed.' })
})

app.get('/filelist', (req, res) => {
  res.json(fileListWithoutPath)
})


// API ROUTER
// app.use(express.static(path.join(__dirname, '/../simple-song-search/build')))
// app.use('/', indexRouter)
// app.use(express.json())
// app.use('/api', songSearchAPIRouter)
// app.use('/search', express.static(__dirname + '/../simple-song-search/build'))
// app.use('/search', searchRouter)


// LISTEN
// app.listen(port, () => {
  //   console.log("Listening on " + port)
  // })
  
const port = Number(process.env.PORT || PORT)
const server = http.Server(app).listen(port, () => {
  console.log("Listening on " + port)
})

const io = socket(server)

io.on('connection', socket => {
  console.log('success connect!')
  socket.on('getPDFFile', fileIndex => {
    io.sockets.emit('getPDFFile', fileIndex)
  })
})

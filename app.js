const express = require("express")
const app = express()
const logfmt = require("logfmt")
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const fileList = require('./src/getFileList')
// 到時候不用傳全部KEY給CLIENT
const PORT = 5005
// const songSearchAPIRouter = require('./router/api')
// const indexRouter = require('./router/index')
// const searchRouter = require('./router/search')

// LOG
app.use(logfmt.requestLogger())

// CLORS
app.use(cors())

app.get('/', (req, res) => {
  res.send(`PDF REMOTE DISPLY now on port ${PORT}`)
})

app.get('/pdf', (req, res) => {
  const path = fileList[req.query.path].path
  // res.send('path = ' + path)
  // res.send('path = ' + req.params.path)
  const file = fs.readFileSync(path)
  res.contentType("application/pdf")
  res.send(file)
})

app.get('/download', (req, res) => {
  const file = fs.readFileSync('./pdfs/歌譜/台語/心情.pdf')
  res.contentType("application/pdf")
  res.send(file)
})

// API ROUTER
// app.use(express.static(path.join(__dirname, '/../simple-song-search/build')))
// app.use('/', indexRouter)
// app.use(express.json())
// app.use('/api', songSearchAPIRouter)
// app.use('/search', express.static(__dirname + '/../simple-song-search/build'))
// app.use('/search', searchRouter)


// LISTEN
var port = Number(process.env.PORT || PORT)
app.listen(port, () => {
  console.log("Listening on " + port)
})
const express = require("express")
const app = express()
const logfmt = require("logfmt")
const path = require('path')
// const songSearchAPIRouter = require('./router/api')
// const indexRouter = require('./router/index')
// const searchRouter = require('./router/search')

// LOG
app.use(logfmt.requestLogger())

app.get('/', (req, res) => {
  res.send('PDF REMOTE DISPLY on port 5005')
})

// API ROUTER
// app.use(express.static(path.join(__dirname, '/../simple-song-search/build')))
// app.use('/', indexRouter)
// app.use(express.json())
// app.use('/api', songSearchAPIRouter)
// app.use('/search', express.static(__dirname + '/../simple-song-search/build'))
// app.use('/search', searchRouter)




// LISTEN
var port = Number(process.env.PORT || 5005)
app.listen(port, function () {
  console.log("Listening on " + port)
})
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const assert = require('assert')
const express = require("express")
const { dateFormat } = require('../utils/base')
const router = express.Router()

const DB_URL = 'mongodb://localhost:27017'
const DB_NAME = 'history'
const COLLECTION_NAME = 'pdf'
const PART_DATA_COUNT = 25
let db

const SORT_METHOD = { date: -1 }

MongoClient.connect(DB_URL, (err, client) => {
  assert.equal(null, err)
  if (err) {
    console.log("Connect fail.")
  }
  console.log("Connected successfully to mongoDB")
  db = client.db(DB_NAME)
})

router.get('/', (req, res) => {
  res.send('API for song search history GET & POST')
})

// GET ALL RESULT FROM COLLECTION
router.get(`/${COLLECTION_NAME}/all`, (req, res) => {
  db.collection(COLLECTION_NAME).find().sort(SORT_METHOD).toArray((err, data) => {
    if (err) return res.send('get failed.')
    res.send({ data })
  })
})

// GET PART RESULT FROM COLLECTION AND FORMAT THEM
router.get(`/${COLLECTION_NAME}/part`, (req, res) => {
  db.collection(COLLECTION_NAME).find().sort(SORT_METHOD).limit(PART_DATA_COUNT).toArray((err, result) => {
    if (err) return res.send('get failed.')
    const data = result.reduce((acc, value) => {
      const temp = {
        date: dateFormat(Number(value['date']) + 28800000, "MM/dd hh:mm"),
        content: value['content']
      }
      return [...acc, temp]
    }, [])
    res.send({ data })
  })
})

// POST ONE HISTORY
router.post(`/${COLLECTION_NAME}`, (req, res) => {
  const { content } = req.body
  const date = Date.now().toString()
  if (content === undefined) {
    res.send('"content" format error.')
  }
  else {
    db.collection(COLLECTION_NAME).insertOne({ date, content }, (err) => {
      if (err) return res.send('Insert failed.')
      console.log("Insert success")
    })
    res.send('Insert success')
  }
})

// DELETE ONE HISTORY
router.delete(`/${COLLECTION_NAME}/:id`, (req, res) => {
  if (req.params.id === undefined) {
    res.send('id format error.')
  } else {
    const q = { _id: ObjectId(req.params.id) }
    db.collection(COLLECTION_NAME).deleteOne(q, (err, obj) => {
      if (err) return res.send('delete failed.')
      res.send(obj.result.n + " document deleted.")
    })
  }
})

module.exports = router

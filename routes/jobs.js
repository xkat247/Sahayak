const express = require('express');
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const Job = require('../models/job');

//@desc Show add page
//@route GET /jobs/add
router.get('/add',ensureAuth,(req,res) => {
  res.render('jobs_add')
})

//@desc Post to add job
//@route POST /jobs
router.post('/add',ensureAuth,async (req,res) => {
  try {
    req.body.user = req.user.id
    await Job.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

module.exports = router

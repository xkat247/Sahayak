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

//@desc get to find specific job
//@route GET /jobs/:id
router.get('/:id',ensureAuth,async (req,res) => {
  try {
    id = req.params.id
    var job_spec = await Job.findById(id)
    var flag = false
    if(job_spec.applicants.includes(req.user._id)){
      flag =true
    }
    res.render('job_dist',{
      job_spec,flag
    })
  } catch (err) {
    console.log(err)
    res.render('error/404')
  }
})

//@desc post to apply for job specific job
//@route POST /jobs/:id
router.post('/:id',ensureAuth,async (req,res) => {
  try {
    var user = req.user._id
    await Job.findOneAndUpdate(
      { _id: req.params.id }, 
      { $addToSet: { applicants: user } },
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log("Applied");
           }
       });
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.render('error/404')
  }
})

module.exports = router

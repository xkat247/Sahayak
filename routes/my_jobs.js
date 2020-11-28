const express = require('express');
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const Job = require('../models/job');

//@desc My jobs showcase
//@route GET /my_jobs
router.get('/',ensureAuth, async (req,res) => {
  try {
   const jobs  = await Job.find({user:req.user._id}).lean()
   res.render('my_jobs',{jobs})
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})
//@desc delete one of the jobs
//@route Delete /my_jobs/:id
router.delete('/:id',ensureAuth, async (req,res) => {
  try {
   await Job.deleteOne({ _id: req.params.id }).then(
     res.redirect('/my_jobs')
   )
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

//@desc get applicants
//@route get /my_jobs/:id
router.get('/:id',ensureAuth,async (req,res) => {
  try {
    const job = await Job.findById(req.params.id, function (err, arr) {
      if(err){
        console.log(err)
      }
    }).populate('applicants');
    app_list = []

    job.applicants.forEach(async applicant => {
      var {firstName,phone}  = applicant
      var app = {
        firstName,
        phone
      }
      app_list.push(app)
    });
    res.render("applicants",{
      app_list
    })
    
  } catch (err) {
    console.log(err)
    res.render('error/404')
  }
})



module.exports = router

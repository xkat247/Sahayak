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


module.exports = router

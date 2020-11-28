const express = require('express');
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const Job = require('../models/job');

//@desc Login/Landing page
//@route GET /
router.get('/',ensureGuest,(req,res) => {
  res.render('login')
})

//@desc Dashboard/Landing page
//@route GET /dashboard
router.get('/dashboard',ensureAuth, async (req,res) => {
  try {
   const jobs  = await Job.find({ user: { $ne: req.user._id } }).lean()
   res.render('dashboard',{
       name:req.user.firstName,
       jobs
   })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }

})

//@desc Dashboard/Landing page
//@route GET /dashboard
router.post('/dashboard',ensureAuth, async (req,res) => {
  try {
   const jobs  = await Job.find({state:req.user.state,city:req.user.city}).lean()
   res.render('dashboard',{
       name:req.user.firstName,
       jobs
   })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})


//@desc Logout
//@route Get /logout
router.get('/logout', function(req, res){
  try {
         // destroy session saved in db
            req.session.destroy((error) => {
            if (error) {
                throw new Error('something went wrong while logging out')
            }
            res.redirect('/');
        });

    } catch (error) {
      console.log(err)
      res.render('error/500')
    }
});

module.exports = router

const express = require('express');
const passport = require('passport');
const router = express.Router()

//@desc Google auth
//@route GET /auth/google
router.get('/google',passport.authenticate('google',{ scope: ['profile'] }))

//@desc google auth callback
//@route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

//@desc logging out user
//@route /auth/logout
router.get('/logout',(req, res) => {
      req.logout()
      res.redirect('/');
    });

module.exports = router

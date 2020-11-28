const express = require('express');
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const User = require('../models/User');

//@desc Profile page
//@route GET /
router.get('/',ensureAuth,(req,res) => {
    var user = {
        name:req.user.firstName+' '+req.user.lastName,
    }
    var image = req.user.image
    var phone = req.user.phone
    res.render('profile',{
        user,
        image,
        phone
    })
})

//@desc edit Profile page
//@route Post /
router.post('/',ensureAuth,async (req,res) => {
    var phone_no = req.body.phone
    await User.findOneAndUpdate(
        { _id: req.user._id }, 
        { phone: phone_no },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log("Phone no edited");
             }
         });
    res.redirect('/profile')
})


module.exports = router
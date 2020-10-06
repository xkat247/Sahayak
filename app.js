const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const methodOverride = require('method-override')
const pug = require('pug');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({
  path: path.join(__dirname, '/config/config.env')
})

connectDB()

const app = express()

// passport config
require('./config/passport')(passport)


// body parser
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// templating engine
app.set('view engine', 'pug')
app.set('views', './views')


//Cross origin req ie frontend to backend


// sessions
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/jobs', require('./routes/jobs'))
app.use('/my_jobs',require('./routes/my_jobs'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running ${process.env.NODE_ENV} mode on port ${PORT}`))

// const express= require('express')
// const router = express.Router()
// const defaultController = require('../controllers/defaultController')
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcryptjs')
// const { User } = require('../models/UserModel');



// router.all('/*',(req,res,next)=>{
//     req.app.locals.layout ='default';
//     next();
// })


// router.route('/')
// .get(defaultController.index)


// router.route('/about')  
//     .get(defaultController.aboutGet);


// router.route('/login')
// .get(defaultController.loginGet)
// .post(passport.authenticate('local',{
//     successRedirect: '/admin',
//     failureRedirect :'/login',
//     failureFlash : true,
//     successFlash: true,
//     session: true
// }),defaultController.loginPost)

// router.route('/register')
// .get(defaultController.registerGet)
// .post(defaultController.registerPost)



// // Passport Local Strategy
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true,  // Add this line
//   }, async (req, email, password, done) => {
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return done(null, false, { message: 'Incorrect email.' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error);
//   }
// }));



// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

// // To this updated code
// passport.deserializeUser(async function(id, done) {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   });
  

// module.exports= router

const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models/UserModel');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'default';
  next();
});

router.route('/')
  .get(defaultController.index);

router.route('/about')
  .get(defaultController.aboutGet);

// Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error-message', 'Incorrect email.');
      return done(null, false);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      req.flash('error-message', 'Incorrect password.');
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

router.route('/login')
  .get(defaultController.loginGet)
  .post(passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    session: true,
  }), defaultController.loginPost);

router.route('/register')
  .get(defaultController.registerGet)
  .post(defaultController.registerPost);



module.exports = router;


// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const expressHandlebars = require('express-handlebars');
// const { mongodbUrl, PORT, globalVariables } = require('./config/configuration');
// const flash = require('connect-flash');
// const session = require('express-session');
// const methodOverride = require('method-override');
// const { selectOption } = require('./config/customFunctions');
// const fileUpload = require('express-fileupload');
// const postRoutes = require('./routes/postRoutes');
// // const dateformat = require('handlebars-dateformat');
// const userRoute = require("./routes/users")
// const passport = require('passport');



// const app = express();

// // configure Mongoose to connect Mongodb
// mongoose
//   .connect(mongodbUrl, { useNewUrlParser: true })
//   .then((response) => {
//     console.log('mongoDB connected successfully');
//   })
//   .catch((err) => {
//     console.log('connection is not stable');
//   });

// // configure express
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(passport.initialize());
// app.use(passport.session());

// // Flash and session
// app.use(
//   session({
//     secret: 'anysecret',
//     saveUninitialized: true,
//     resave: true,
//   })
// );

// app.use(flash());

// app.use(globalVariables);

// /* File Upload Middleware */
// app.use(fileUpload());

// // set view engine to handlebars
// const hbs = expressHandlebars.create({
//   defaultLayout: 'default',
//   runtimeOptions: {
//     allowProtoPropertiesByDefault: true,
//   },
//   helpers: {
//     select: selectOption,
//     // dateformat: dateformat, // Register the dateformat helper
//   },
// });

// // Adjust the views directory setting
// app.set('views', [
//   path.join(__dirname, 'views'),  // Add the root views directory
//   path.join(__dirname, 'views/posts'),
// ]);

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // Method override middleware
// app.use(methodOverride('newMethod'));

// // routes
// const defaultRoutes = require('./routes/defaultRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// app.use('/', defaultRoutes);
// app.use('/admin', adminRoutes);
// app.use('/posts', postRoutes);
// app.use("/users", userRoute);


// // Add the route for post details here
// app.get('/posts/:postId', (req, res) => {
//   // Fetch the post details based on postId and other criteria
//   // Render the 'post_detail' page with the fetched data
//   res.render('posts/post_detail', { postId: req.params.postId, /* other data */ });
// });

// app.listen(PORT, () => {
//   console.log(`server is running on ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const { mongodbUrl, PORT, globalVariables } = require('./config/configuration');

const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const { selectOption } = require('./config/customFunctions');
const fileUpload = require('express-fileupload');
const postRoutes = require('./routes/postRoutes');
const userRoute = require("./routes/users");
const passport = require('passport');

const app = express();

// configure Mongoose to connect Mongodb
mongoose
  .connect(mongodbUrl, { useNewUrlParser: true })
  .then((response) => {
    console.log('mongoDB connected successfully');
  })
  .catch((err) => {
    console.log('connection is not stable');
  });

// configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Flash and session
app.use(
  session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true,
  })
)

app.use(flash());
app.use(globalVariables);
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

// set view engine to handlebars
const hbs = expressHandlebars.create({
  defaultLayout: 'default',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
  helpers: {
    select: selectOption,
    // dateformat: dateformat, // Register the dateformat helper
  },
});

// Adjust the views directory setting
app.set('views', [
  path.join(__dirname, 'views'),  // Add the root views directory
  path.join(__dirname, 'views/posts'),
]);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  res.locals.isUserAuthenticated = req.isAuthenticated();
  next();
});

// Method override middleware
app.use(methodOverride('newMethod'));

// routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoute);  // <-- Make sure this is in the correct order

// Add the route for post details here
app.get('/posts/:postId', (req, res) => {
  // ... your post details route
  res.render('posts/post_detail', { postId: req.params.postId, /* other data */ });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

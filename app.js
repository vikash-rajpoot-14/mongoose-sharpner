const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');

dotenv.config({path : './config.env'})


const DB = process.env.DB

mongoose.connect(DB).then(()=>{
  console.log("connected");
}).catch(error =>console.log(error));

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("64956291bd7610cca87596d9")
    .then(user => {
      // console.log(user);
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log(`listening on http://localhost:${PORT} `);
  // User.create({name:"vikash" , email:"vikash@gmail.com"})
})
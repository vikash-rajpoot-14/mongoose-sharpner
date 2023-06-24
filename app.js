const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');

dotenv.config({path : './config.env'})


const DB = process.env.DB

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("6496cb5f7c8e60d3574d17a7")
    .then(user => {
      req.user = user;
      // console.log(req.user);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT

mongoose.connect(DB).then(()=>{
  console.log("connected to");
  app.listen(PORT,()=>{
    User.findOne().then((user)=>{
      if(!user){
        const user = new User({name: 'John', email: 'john@example.com',cart : {items : []}});
        user.save();
      }
  })
    console.log(`listening on http://localhost:${PORT} `);
  })
}).catch(error =>console.log(error));

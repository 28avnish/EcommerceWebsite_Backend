const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/myDB');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://avnish:avnish@cluster0.i8f770y.mongodb.net/myDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("MongoDb Connection Successful"))
  .catch((error) => console.log(error.message));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json('The password is incorrect');
      }
    } else {
      res.json('User not exists');
    }
  });
});

app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      res.json('User already exists');
    } else {
      const newUser = await UserModel.create({ firstname, lastname, email, password });
      res.json(newUser);
    }
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});

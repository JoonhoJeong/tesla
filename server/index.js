const express = require('express')
const app = express()
const port = 5000
const {Performance} = require('./models/Performance')
const bodyParser = require('body-parser');

const config = require('./config/key');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!!!!!')
})

app.post('/register', (req, res) => {
  const performance = new Performance(req.body);
  performance.save((err, doc) => {
    if(err) return res.json({success: false, err})

    return res.status(200).json({
      success: true
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
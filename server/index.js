const express = require('express')
const app = express()
const port = 5000
const {Performance} = require('./models/Performance')
const bodyParser = require('body-parser');
const {format, eachDayOfInterval} = require('date-fns');

const config = require('./config/key');
const parseISO = require('date-fns/parseISO')
const parseJSON = require('date-fns/parseJSON')
// import { add, format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isToday, isYesterday,
//   isThisWeek, isThisMonth, isThisYear, differenceInDays } from 'date-fns';

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

let DateRange = {startDate:null, endDate:null};
app.post('/api/getEnergyInfo', (req, res) => {
  let array = [];

  console.log("JJH server1", req.body.startDate);
  parseStartDate = parseISO(req.body.startDate);
  parseEndDate = parseISO(req.body.endDate);
  
  array = eachDayOfInterval({
    start: parseStartDate,
    end: parseEndDate
  });
  
  console.log("JJH server2", format(parseStartDate, 'yyyy-MM-dd'));
  console.log("JJH server2-2", array);
  Performance.find({'date': format(parseStartDate, 'yyyy-MM-dd')})
    .exec((err, energyData) => {
      if (err) return res.status(400).send(err);
    
      console.log("JJH server3", energyData);
      return res.status(200).json({ success: true, energyData });
    })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
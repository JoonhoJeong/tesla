const express = require('express')
const app = express()
const port = 5000
const {Performance} = require('./models/Performance')
const bodyParser = require('body-parser');
const {format, eachDayOfInterval} = require('date-fns');

const config = require('./config/key');
const parseISO = require('date-fns/parseISO')
const parseJSON = require('date-fns/parseJSON')

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

  parseStartDate = parseISO(req.body.startDate);
  parseEndDate = parseISO(req.body.endDate);
  
  array = eachDayOfInterval({
    start: parseStartDate,
    end: parseEndDate
  });
  
  array.forEach(function(item, index, arr) {
    arr[index] = format(item, 'yyyy-MM-dd');
  });

  Performance.find({'date': array})
  .exec((err, energyData) => {
    if (err) return res.status(400).send(err);
    let energyDataTotal = {self_powered_solar:0, self_powered_powerwall:0, solar_offset_solar:0, solar_offset_home:0};
    let energyDataResult = {self_powered_solar:0, self_powered_powerwall:0, solar_offset_solar:0, solar_offset_home:0};
    let count = 0;
    console.log("JJH server1", energyData);
    energyData.forEach(function(item, index, arr) {
      energyDataTotal.self_powered_solar += item.self_powered_solar;
      energyDataTotal.self_powered_powerwall += item.self_powered_powerwall;
      energyDataTotal.solar_offset_solar += item.solar_offset_solar;
      energyDataTotal.solar_offset_home += item.solar_offset_home;
      count++;
      console.log("JJH server2", energyDataTotal);
    });
    
    energyDataResult.self_powered_solar += energyDataTotal.self_powered_solar / count;
    energyDataResult.self_powered_powerwall += energyDataTotal.self_powered_powerwall / count;
    energyDataResult.solar_offset_solar += energyDataTotal.solar_offset_solar;
    energyDataResult.solar_offset_home += energyDataTotal.solar_offset_home;
    console.log("JJH server3", energyDataResult);
    return res.status(200).json({ success: true, energyDataResult});
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
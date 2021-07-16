import Head from './Head';
import DateSelect from './DateSelect';
import SelfPowered from './SelfPowered';
import SolarOffset from './SolarOffset';
import './style.css';
import { add, format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isToday, isYesterday,
  isThisWeek, isThisMonth, isThisYear, differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import Axios from 'axios';

let DateRange = {startDate:null, endDate:null};

function App() {
  //const [EnergyData, setEnergyData] = useState([]);
  const [EnergyData, setEnergyData] = useState({self_powered_solar:0, self_powered_powerwall:0, solar_offset_solar:0, solar_offset_home:0});

  const OnEventHandler = (arg) => {
    // DateRange.startDate = format(arg.startDate, 'yyyy-MM-dd');
    // DateRange.endDate = format(arg.endDate, 'yyyy-MM-dd');
    DateRange = arg;
    console.log("OnEventHandler", DateRange);

    Axios.post('/api/getEnergyInfo', DateRange)
      .then(response => {
        if(response.data.success) {
          console.log("here", response.data);
          let res = response.data.energyDataResult;
          setEnergyData({self_powered_solar:res.self_powered_solar,
                        self_powered_powerwall:res.self_powered_powerwall,
                        solar_offset_solar:res.solar_offset_solar,
                        solar_offset_home:res.solar_offset_home});
          console.log("energyData", response.data.energyData);

        } else {
          alert('정보를 가져오는데 실패 했습니다.');
        }
    })
  }

  console.log("EnergyData", EnergyData);

  return (
    <div className="App" display="flex" justifyContent="center" alignItems="center">
      <Head />
      <DateSelect OnEvent={OnEventHandler}/>
      <SelfPowered solar={EnergyData.self_powered_solar} powerwall={EnergyData.self_powered_powerwall}/>
      <SolarOffset solar={EnergyData.solar_offset_solar} home={EnergyData.solar_offset_home}/>
    </div>
  );
}

export default App;

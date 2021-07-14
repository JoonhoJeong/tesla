import Head from './Head';
import DateSelect from './DateSelect';
import SelfPowered from './SelfPowered';
import SolarOffset from './SolarOffset';
import './style.css';
import { add, format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isToday, isYesterday,
  isThisWeek, isThisMonth, isThisYear, differenceInDays } from 'date-fns';

function App() {
  const OnEventHandler = (DateRange) => {
    
    const result = differenceInDays(
      DateRange.startDate,
      DateRange.endDate
    )
    console.log("OnEventHandler", DateRange, result);
  }
  return (
    <div className="App" display="flex" justifyContent="center" alignItems="center">
      <Head />
      <DateSelect OnEvent={OnEventHandler}/>
      <SelfPowered solar="50" powerwall="10"/>
      <SolarOffset />
    </div>
  );
}

export default App;

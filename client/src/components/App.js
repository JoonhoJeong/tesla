import Head from './Head';
import DateSelect from './DateSelect';
import SelfPowered from './SelfPowered';
import SolarOffset from './SolarOffset';
import './style.css';

function App() {
  return (
    <div className="App" display="flex" justifyContent="center" alignItems="center">
      <Head />
      <DateSelect />
      <SelfPowered solar="50" powerwall="10"/>
      <SolarOffset />
    </div>
  );
}

export default App;

import { Box, Card, CardContent } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

function SelfPowered(props) {
  const totalValue = (+props.solar) + (+props.powerwall);
  const data01 = [
    { "name": 'Solar', "value": +props.solar },
    { "name": 'Powerwall', "value": +props.powerwall },
  ];

  const data_default = [
    { "name": '', "value": 100 }
  ];

  const COLORS = ['#ffc107', '#64dd17', '#BBBBBB'];


  return (
    <div style={{margin: "1rem"}}>
      <Card variant="outlined"
        style={{width: "85%", position: "absolute", left: "7.5%", backgroundColor: "#323232", padding: "0px", borderRadius:"15px"}}>
        <CardContent>
          <h5 style={{color: "#E0E0E0", margin: "1rem"}}>Self-Powered</h5>

          <Box style={{display: "flex", position: "absolute", left: "9.5em", top: "10em", color: "#E0E0E0"}}>
            <TweenOne animation={{Children: {
                                    value: totalValue,
                                    floatLength: 0
                                  }, duration: 2000}}>
              0
            </TweenOne>
            %
          </Box>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <PieChart width={300} height={250}>
            <Pie data={data_default} dataKey="value" nameKey="name"
                 cx="50%" cy="50%" innerRadius={60} outerRadius={80}
                 startAngle={90} endAngle={-270} fill={COLORS[2]} isAnimationActive={false}/>
            <Pie data={data01} dataKey="value" nameKey="name"
                 cx="50%" cy="50%" innerRadius={60} outerRadius={80}
                 startAngle={90} endAngle={90-((+props.solar)+(+props.powerwall))*3.6} animationDuration="2000"
                 style={{backgroundColor: "#BBBBBB"}}>
              {
                data01.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                ))
              }
            </Pie>
          </PieChart>
          {/* </ResponsiveContainer> */}

          <Box style={{display: "flex", justifyContent: "space-around"}}>
            <Box>
              <h6 style={{margin: "0px", color: "#d0d0d0"}}>
                <FiberManualRecordIcon style={{color: "#ffc107", fontSize: 12}}/>
                Solar
              </h6>
              <p style={{margin: "0px", color: "white"}}>{props.solar}%</p>
            </Box>
            <Box>
              <h6 style={{margin: "0px", color: "#d0d0d0"}}>
                <FiberManualRecordIcon style={{color: "#64dd17", fontSize: 12}}/>
                Powerwall
              </h6>
              <p style={{margin: "0px", color: "white"}}>{props.powerwall}%</p>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelfPowered

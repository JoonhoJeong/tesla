import { Box, Card, CardContent } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { PieChart, Pie, Cell } from 'recharts'
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

function SelfPowered(props) {

  const data01 = [
    { "name": 'Solar', "value": +props.solar },
    { "name": 'Powerwall', "value": +props.powerwall },
  ];

  const data_default = [
    { "name": '', "value": 100 }
  ];

  const COLORS = ['#fdd525', '#3db844', '#929292'];

  return (
    <div style={{margin: "1rem"}}>
      <Card variant="outlined"
        style={{width: "95%", position: "relative", left: "2.5%", backgroundColor: "#262729", borderRadius:"20px"}}>
        <CardContent style={{padding: "0px"}}>
          <h5 style={{color: "#d8d9d9", margin: "1rem"}}>Self-Powered</h5>

        </CardContent>
        <CardContent style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "0px"}}>
          <Box style={{display: "flex", position: "absolute", color: "#f6f6f6"}}>
            <TweenOne animation={{Children: {
                                    value: (+props.solar) + (+props.powerwall),
                                    floatLength: 0
                                  }, duration: 2000}}>
              0
            </TweenOne>
            %
          </Box>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <PieChart width={300} height={150}>
            <Pie data={data_default} dataKey="value" nameKey="name"
                 cx="50%" cy="50%" innerRadius={47} outerRadius={60}
                 startAngle={90} endAngle={-270} fill={COLORS[2]} isAnimationActive={false}/>
            <Pie data={data01} dataKey="value" nameKey="name"
                 cx="50%" cy="50%" innerRadius={47} outerRadius={60}
                 startAngle={90} endAngle={90-((+props.solar)+(+props.powerwall))*3.6} animationDuration='2000' paddingAngle={0}>
              {
                data01.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                ))
              }
            </Pie>
          </PieChart>
          {/* </ResponsiveContainer> */}
        </CardContent>
        <CardContent style={{padding: "1vh"}}>
          <Box style={{display: "flex", justifyContent: "space-between", padding: "15px"}}>
            <Box>
              <h6 style={{margin: "0px", color: "#ababab", display:"flex", alignItems: "center"}}>
                <FiberManualRecordIcon style={{color: "#fdd525", fontSize: 13}}/>
                Solar
              </h6>
              <p style={{margin: "0px", color: "#cfcfcf", fontSize: 13, paddingLeft: "12px"}}>{props.solar}%</p>
            </Box>
            <Box>
              <h6 style={{margin: "0px", color: "#ababab", display:"flex", alignItems: "center"}}>
                <FiberManualRecordIcon style={{color: "#3db844", fontSize: 13}}/>
                Powerwall
              </h6>
              <p style={{margin: "0px", color: "#cfcfcf", fontSize: 13, paddingLeft: "12px"}}>{props.powerwall}%</p>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelfPowered

import React from 'react'
import { Box, Card, CardContent } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);


function SolarOffset(props) {
  const data01 = [
    { "name": 'Solar', "value": +props.solar },
    { "name": 'Home', "value": +props.home },
    // {
    //   name: 'Page A',
    //   uv: 4000,
    //   pv: 2400,
    //   amt: 2400,
    // },
    // {
    //   name: 'Page B',
    //   uv: 3000,
    //   pv: 1398,
    //   amt: 2210,
    // },
  ];

  const COLORS = ['#fdd525', '#00aeef', '#929292'];

  return (
    <div style={{margin: "1rem"}}>
      <Card variant="outlined"
        style={{width: "95%", position: "relative", left: "2.5%", paddingBottom: "10px", backgroundColor: "#262729", borderRadius:"20px"}}>
        <CardContent style={{padding: "0px"}}>
          <h5 style={{color: "#d8d9d9", margin: "1rem"}}>Solar Offset</h5>

        </CardContent>
        <CardContent style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "0px"}}>
          <Box style={{position: "absolute", color: "#cfcfcf", top: "30%"}}>
            <Box style={{display: "flex", justifyContent: "center"}}>
              <TweenOne animation={{Children: {
                                      value: parseInt((+props.solar) / (+props.home) * 100),
                                      floatLength: 0
                                    }, duration: 2000}}>
                0
              </TweenOne>
              %
            </Box>
            <h6 style={{margin: "0px"}}>Energy Offset</h6>
          </Box>

          <BarChart width={300} height={150} data={data01} barSize={30}>
            <Bar dataKey="value" animationDuration="2000" radius={3}>
            {
              data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]}/>
              ))
            }
            </Bar>
          </BarChart>

        </CardContent>
        <CardContent style={{padding: "1vh"}}>
          <Box style={{display: "flex", justifyContent: "space-around"}}>
            <Box>
              <h6 style={{margin: "0px", color: "#cfcfcf", display: "inline"}}>{props.solar} kWh</h6>
              <h6 style={{margin: "0px", color: "#fdd525", display: "inline", marginLeft: "4px"}}>
                Solar
              </h6>
            </Box>
            <Box>
            <h6 style={{margin: "0px", color: "#cfcfcf", display: "inline"}}>{props.home} kWh</h6>
              <h6 style={{margin: "0px", color: "#00aeef", display: "inline", marginLeft: "4px"}}>
                Home
              </h6>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default SolarOffset


import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ArrowBackIos, ArrowForwardIos, KeyboardArrowDown } from '@material-ui/icons';


function DateSelect() {

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" p={2} borderBottom={1}>
        <Button style={{ color: "#eeeeee", position: "absolute", left: "3rem"}}>
          <ArrowBackIos color="white" style={{ fontSize: 15 }} />
        </Button>
        <Button style={{ display: "block", color: "#eeeeee"}}>
          <Box>Today</Box> 
          <KeyboardArrowDown color="white"/>
        </Button>
        <Button style={{ color: "#eeeeee", position: "absolute", right: "3rem"}}>
          <ArrowForwardIos color="white" style={{ fontSize: 15 }} />
        </Button>
      </Box>
    </div>
  )
}

export default DateSelect

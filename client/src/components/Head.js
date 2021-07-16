import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ArrowBackIos } from '@material-ui/icons';

function Head() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <Button style={{ color: "#e5e5e5", position: "absolute", left: "1rem"}}>
        <ArrowBackIos color="e5e5e5" />
      </Button>
      <Box>Performance</Box>
    </Box>
  )
}

export default Head

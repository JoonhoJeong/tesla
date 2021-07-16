import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ArrowBackIos, ArrowForwardIos, KeyboardArrowDown } from '@material-ui/icons';
import { add, format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isToday, isYesterday,
        isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import DateConvertDialog from './DateConvertDialog';

let currentDate = add(new Date(), {days: -1});
let DateRange = { startDate: currentDate, endDate: currentDate};
function DateSelect(props) {
  const [Mode, setMode] = useState("DAY")
  const [open, setOpen] = useState(false);
  const [DateIndex, setDateIndex] = useState("Yesterday")
  const [ShowButton, setShowButton] = useState(["block", "block"]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const changeDateRange = (str) => {

    switch (str) {
      case "DAY":
        DateRange = {startDate: currentDate, endDate: currentDate};
        if (isToday(currentDate)) {
          setDateIndex("Today");
        } else if (isYesterday(currentDate)) {
          setDateIndex("Yesterday");
        } else {
          setDateIndex(format(currentDate, 'yyyy-MM-dd'));
        }
        if (isToday(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "WEEK":
        DateRange = {startDate: startOfWeek(currentDate), endDate: endOfWeek(currentDate)};
        setDateIndex(format(startOfWeek(currentDate), 'yyyy-MM-dd') +
                      ' ~ ' + format(endOfWeek(currentDate), 'yyyy-MM-dd'));
        if (isThisWeek(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "MONTH":
        DateRange = {startDate: startOfMonth(currentDate), endDate: endOfMonth(currentDate)};
        setDateIndex(format(startOfMonth(currentDate), 'yyyy-MM-dd') +
                      ' ~ ' + format(endOfMonth(currentDate), 'yyyy-MM-dd'));
        if (isThisMonth(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "YEAR":
        DateRange = {startDate: startOfYear(currentDate), endDate: endOfYear(currentDate)};
        setDateIndex(format(startOfYear(currentDate), 'yyyy-MM-dd') +
                      ' ~ ' + format(endOfYear(currentDate), 'yyyy-MM-dd'));
        if (isThisYear(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "LIFETIME":
        DateRange = "LIFETIME";
        setDateIndex("LifeTime");
        setShowButton(["none", "none"]);
        break;
      default :
        break;
    }

    props.OnEvent(DateRange);
  }

  const handleClose = (str) => {
    setOpen(false);
    if (Mode === str)
      return;
    setMode(str);
    changeDateRange(str);
  };

  const moveDateIndex = (i) => {

    switch (Mode) {
      case "DAY":
        currentDate = add(currentDate, {days: i});
        break;
      case "WEEK":
        currentDate = add(currentDate, {weeks: i});
        break;
      case "MONTH":
        currentDate = add(currentDate, {months: i});
        break;
      case "YEAR":
        currentDate = add(currentDate, {years: i});
        break;
      case "LIFETIME":
        break;
      default :
        break;
    }

    changeDateRange(Mode);
  }
  useEffect(() => {
    props.OnEvent(DateRange);
  }, [])

  return (
    <div>
      <DateConvertDialog open={open} handleClose={(str)=>handleClose(str)}/>
      <Box display="flex" justifyContent="center" alignItems="center" p={2} borderBottom={1}>
        <Box display={ShowButton[0]} style={{position: "absolute", left: "3rem"}}>
          <Button style={{ color: "#e5e5e5"}} onClick={()=>moveDateIndex(-1)}>
            <ArrowBackIos color="a0a0a0" style={{ fontSize: 15 }} />
          </Button>
        </Box>
        <Button style={{ display: "block", color: "#e5e5e5"}} onClick={handleClickOpen}>
          <Box>{DateIndex}</Box>
          <KeyboardArrowDown color="#e5e5e5"/>
        </Button>
        <Box display={ShowButton[1]} style={{position: "absolute", right: "3rem"}}>
          <Button onClick={()=>moveDateIndex(1)}
             style={{ color: "#eeeeee"}}>
            <ArrowForwardIos color="a0a0a0" style={{ fontSize: 15 }} />
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default DateSelect

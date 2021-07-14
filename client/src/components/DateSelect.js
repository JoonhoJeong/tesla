import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ArrowBackIos, ArrowForwardIos, KeyboardArrowDown } from '@material-ui/icons';
import { add, format, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, isToday, isYesterday,
        isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import DateConvertDialog from './DateConvertDialog';

let currentDate = add(new Date(), {days: -1});

function DateSelect(props) {
  const [DateRange, setDateRange] = useState({
      startDate: currentDate,
      endDate: currentDate
  });
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
        setDateRange({startDate: currentDate, endDate: currentDate});
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
        setDateRange({startDate: startOfWeek(currentDate), endDate: endOfWeek(currentDate)});
        setDateIndex(format(startOfWeek(currentDate), 'yyyy-MM-dd') +
                      ' ~ ' + format(endOfWeek(currentDate), 'yyyy-MM-dd'));
        if (isThisWeek(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "MONTH":
        setDateRange({startDate: startOfMonth(currentDate), endDate: endOfMonth(currentDate)});
        setDateIndex(format(startOfMonth(currentDate), 'yyyy-MM-dd') +
                      ' ~ ' + format(endOfMonth(currentDate), 'yyyy-MM-dd'));
        if (isThisMonth(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "YEAR":
        setDateRange({startDate: startOfYear(currentDate), endDate: endOfYear(currentDate)});
        setDateIndex(format(startOfYear(currentDate), 'yyyy-MM-dd') +
                      ' ~ ' + format(endOfYear(currentDate), 'yyyy-MM-dd'));
        if (isThisYear(currentDate)) {
          setShowButton(["block", "none"]);
        } else if (ShowButton[1]==="none") {
          setShowButton(["block", "block"]);
        }
        break;
      case "LIFETIME":
        setDateIndex("LifeTime");
        setShowButton(["none", "none"]);
        break;
      default :
        break;
    }
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
    console.log("useEffect");
    props.OnEvent(DateRange);
  }, [DateRange])

  return (
    <div>
      <DateConvertDialog open={open} handleClose={(str)=>handleClose(str)}/>
      <Box display="flex" justifyContent="center" alignItems="center" p={2} borderBottom={1}>
        <Box display={ShowButton[0]} style={{position: "absolute", left: "3rem"}}>
          <Button style={{ color: "#eeeeee"}} onClick={()=>moveDateIndex(-1)}>
            <ArrowBackIos color="white" style={{ fontSize: 15 }} />
          </Button>
        </Box>
        <Button style={{ display: "block", color: "#eeeeee"}} onClick={handleClickOpen}>
          <Box>{DateIndex}</Box> 
          <KeyboardArrowDown color="white"/>
        </Button>
        <Box display={ShowButton[1]} style={{position: "absolute", right: "3rem"}}>
          <Button onClick={()=>moveDateIndex(1)}
             style={{ color: "#eeeeee"}}>
            <ArrowForwardIos color="white" style={{ fontSize: 15 }} />
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default DateSelect

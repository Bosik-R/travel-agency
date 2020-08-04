import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const dateToStr = function(dateObj){
  return dateObj.toISOString().slice(0, 10);
};

function addDays(date, days) {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + days);
  return tomorrow;
}

const OrderOptionDate = ({setOptionValue}) => {
  const tomorrow = addDays(new Date(),1);
  
  const [startDate, setStartDate] = useState(tomorrow);
  const handleChange = (date) => {
    setStartDate(date);
    setOptionValue(dateToStr(date));
  };

  return (
    <DatePicker 

      startDate={startDate}
      className={styles.date} 
      selected={startDate} 
      onChange={date => handleChange(date)} 
      dateFormat={'dd/MM/yyyy'}
      minDate={tomorrow}
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
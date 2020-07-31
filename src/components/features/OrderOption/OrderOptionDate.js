import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const dateToStr = function(dateObj){
  return dateObj.toISOString().slice(0, 10);
};

const OrderOptionDate = ({setOptionValue}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    setOptionValue(dateToStr(date));
  };

  return (
    <DatePicker 
      className={styles.date} 
      selected={startDate} 
      //onChange={date => setStartDate(date)}
      onChange={date => handleChange(date)}
 
      dateFormat={'dd/MM/yyyy'}
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
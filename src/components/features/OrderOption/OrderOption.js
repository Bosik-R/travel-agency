import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate, 
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  console.log('orderOption: ','name:', name,'type:', type,'id:', id,'other:', otherProps);
  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  }else{
    return (
      <div className={styles.component} >
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent 
          setOptionValue={value => setOrderOption({[id]: value})}
          {...otherProps}
        />
      </div>
    );
  }
};

OrderOption.propTypes = {
  name: PropTypes.string,
};

export default OrderOption;
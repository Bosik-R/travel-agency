import React from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './Header.scss';


const settings = {
  nightDescription: 'The office opens at 8:00 UTC',
  firstEmployee: 'Amanda,  678.243.8455',
  secondEmployee: 'Tobias,  278.443.6443',
  thirdEmployee: 'Helena,  167.280.3970',
};

class ContactNumber extends React.Component {
  constructor() {
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  
  getCurrentDescription() {
    const currentTime = new Date();
    const hours = currentTime.getUTCHours();

    if (hours >= 22 || hours < 8){
      return settings.nightDescription;
    }
    if (hours >= 8 && hours < 12){
      return settings.firstEmployee;
    }
    if (hours >= 12 && hours < 16){
      return settings.secondEmployee;
    }
    if (hours >= 16 && hours < 22){
      return settings.thirdEmployee;
    }
  }
  
  render() {
    return (
      <div className={styles.contact}>
        <Icon name='phone' /><span>{this.getCurrentDescription()}</span>
      </div>
    );
  }
}

export default ContactNumber;
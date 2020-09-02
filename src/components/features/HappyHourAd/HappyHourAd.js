import React from 'react';
import styles from './HappyHourAd.scss';
import { formatTime } from '../../../utils/formatTime';

const promoDescription = 'it is your lucky day';
const title = 'Happy Hour';

class HappyHourAd extends React.Component {
  constructor(){
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  getCountdownTime() {
    const currentTime = new Date();
    const nextNoon = new Date(
      Date.UTC(currentTime.getUTCFullYear(), 
        currentTime.getUTCMonth(), 
        currentTime.getUTCDate(), 
        12, 0, 0, 0));
  
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
  
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }
  
  render() {
    const renderedContent = this.getCountdownTime() > (23 * 60 * 60) ? promoDescription : formatTime(this.getCountdownTime());

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{renderedContent}</div>
      </div>
    );
  }
}

export default HappyHourAd;
import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
  descr: '.descr',
};

const mocProps = {
  title: 'Happy Hour',
  promoDescription: 'it is your lucky day',
};

describe('component HappyHourAd', () => {

  it('should render without crashing', () => {
    expect(shallow(<HappyHourAd />)).toBeTruthy();
  });

  it('should render title and promoDescription', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });

  it('should render prop title corect', () => {
    const component = shallow(<HappyHourAd {...mocProps}/>);
    const renderedTitle = component.find(select.title).text();
    expect(renderedTitle).toEqual(mocProps.title);
  });
});

const trueDate = Date;
const mocDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();        
  }
}; 

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mocDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mocProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mocDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mocProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mocDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00',60 * 60, 22 * 60 * 60 + '');
});

describe('Component HappyHourAd with mocked Date in promo time', () => {
  checkDescriptionAtTime('12:00:00', mocProps.promoDescription);
  checkDescriptionAtTime('12:30:00', mocProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mocProps.promoDescription);
});

describe('Component HappyHourAd with mocked Date and delay in promo time', () => {
  checkDescriptionAfterTime('11:59:00', 2 * 60, mocProps.promoDescription);
  checkDescriptionAfterTime('12:30:00',10 * 60, mocProps.promoDescription);
  checkDescriptionAfterTime('12:00:00',60 * 60, 23 * 60 * 60 + '');
});

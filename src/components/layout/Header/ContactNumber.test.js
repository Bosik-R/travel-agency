import React from 'react';
import {shallow} from 'enzyme';
import ContactNumber from './ContactNumber';

const select = {
  content: 'span',
  icon: 'Icon',
};

const mocProps = {
  nightDescription: 'The office opens at 8:00 UTC',
  firstEmployee: 'Amanda,  678.243.8455',
  secondEmployee: 'Tobias,  278.443.6443',
  thirdEmployee: 'Helena,  167.280.3970',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe('component HappyHourAd', () => {

  it('should render without crashing', () => {
    expect(shallow(<ContactNumber />)).toBeTruthy();
  });

  it('should render component Icon', () => {
    expect(shallow(<ContactNumber />).find('Icon')).toBeTruthy();
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
    
    const component = shallow(<ContactNumber {...mocProps} />);
    const renderedTime = component.find(select.content).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct content ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mocDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<ContactNumber {...mocProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mocDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.content).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component ContactNumber office closed', () => {
  checkDescriptionAtTime('07:59:59', mocProps.nightDescription);
  checkDescriptionAtTime('22:00:01', mocProps.nightDescription);
  checkDescriptionAtTime('03:59:00', mocProps.nightDescription);
});

describe('Component ContactNumber first employee', () => {
  checkDescriptionAtTime('08:00:00', mocProps.firstEmployee);
  checkDescriptionAtTime('10:00:00', mocProps.firstEmployee);
  checkDescriptionAtTime('11:59:59', mocProps.firstEmployee);
});

describe('Component ContactNumber second employee', () => {
  checkDescriptionAtTime('12:00:00', mocProps.secondEmployee);
  checkDescriptionAtTime('14:00:00', mocProps.secondEmployee);
  checkDescriptionAtTime('15:59:59', mocProps.secondEmployee);
});


describe('Component ContactNumber first employee', () => {
  checkDescriptionAtTime('16:00:00', mocProps.thirdEmployee);
  checkDescriptionAtTime('18:00:00', mocProps.thirdEmployee);
  checkDescriptionAtTime('21:59:59', mocProps.thirdEmployee);
});

describe('Component ContactNumber second employee', () => {
  checkDescriptionAfterTime('07:59:59', 5, mocProps.firstEmployee);
  checkDescriptionAfterTime('12:59:58', 5, mocProps.secondEmployee);
  checkDescriptionAfterTime('15:59:58', 5, mocProps.thirdEmployee);
  checkDescriptionAfterTime('21:59:58', 5, mocProps.nightDescription);
});

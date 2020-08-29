import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render without crashing', () => {
    const expectedTags = ['firstTag', 'secondTag','thirdTag'];
    const component = shallow(<TripSummary id='abc' tags={expectedTags} />);
    expect(component).toBeTruthy();
  });

  it('should render correct link', () => {
    const expectedLink = '/trip/abc';

    const component = shallow(<TripSummary 
      id={'abc'} 
      tags={['firstTag', 'secondTag','thirdTag']} 
    />);

    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct <img> props src and alt', () => {
    const expectedImage = 'image.jpg';
    const expectedImageAlt = 'name';

    const component = shallow(<TripSummary 
      image={expectedImage}
      name={expectedImageAlt}
      tags={['firstTag', 'secondTag','thirdTag']} 
    />);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedImageAlt);
  });

  it('should render correct props: name, cost, days', () => {
    const expectedDays = 8;
    const expectedCost = '400';
    const expectedName = 'name';

    const component = shallow(<TripSummary 
      days={expectedDays}
      cost={expectedCost}
      name={expectedName}
      tags={['firstTag', 'secondTag','thirdTag']} 
    />);

    expect(component.find('.title').text(expectedName));
    expect(component.find('.details').childAt(0).text()).toEqual(`${expectedDays} days`);
    expect(component.find('.details').childAt(1).text()).toEqual(`from ${expectedCost}`);
  });


  it('should throw error if props: id, iamge, name, cost, days are missing', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should skip render if prop Tags is empty or missing', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary tags={expectedTags} />);
    const component1 = shallow(<TripSummary />);

    expect(component.hasClass('.tags')).toBe(false);
    expect(component1.hasClass('.tags').toBe(false));
  });
});

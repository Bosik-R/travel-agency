import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe(' component OrderOption ', () => {
  
  it ('should render without crashing', () => {
    const component = shallow((<OrderOption type={'dropdown'} name={'name'} />));
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render proper title', () => {
    const expectedName = 'name';
    const component = shallow(<OrderOption 
      name={expectedName}
      type={'dropdown'}
    />);

    const expectedText = component.find('.title').text();
    expect(expectedText).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subComponent;
    let renderedSubComponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );

      subComponent = component.find(optionTypes[type]);
      renderedSubComponent = subComponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(1).toBe(1);
    });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subComponent).toBeTruthy();
      expect(subComponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubComponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      
      case 'icons': {
        /* test for icons */
        it('contains a div with class icon', () => {
          const divWithIcon = renderedSubComponent.find('.icon');
          expect(divWithIcon.length).toBe(mockProps.values.length);
        });

        it('contains a div with class iconActive', () => {
          const divWithIconActive = renderedSubComponent.find('.iconActive').length;
          expect(divWithIconActive).toBe(1);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubComponent.find('.icon').at(1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'checkboxes': {
        /* test for checkboxes */
        it('should contain input type=checkbox', () => {
          const input = renderedSubComponent.find('input[type="checkbox"]');         
          expect(input.length).toBe(2);
          expect(input.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(input.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubComponent.find(`input[value='${testValue}']`).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }

      case 'number': {
        /* test for number */
        it('contains input', () => {
          const input = renderedSubComponent.find('input');
          expect(input.length).toBe(1);                
        });

        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }

      case 'text' : {
        /* test for text */
        it('contains input', () => {
          const input = renderedSubComponent.find('input');
          expect(input.length).toBe(1);        
        });

        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date' : {
        /* test for date */
        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}
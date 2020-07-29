/* SELECTORS */

export const getAllCountries = ({countries}) => countries;
export const getCountryByCode = ({countries}, countryCode) => countries[countryCode];

/* ACTIONS */

// action name creator
const reducerName = 'countries';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const GET_COUNTRY = createActionName('GET_COUNTRY');

// action creators
export const createActionGetCountry = payload => ({
  payload: {...payload},
  type: GET_COUNTRY,
});

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case GET_COUNTRY:
      return [...statePart, action.payload];
    default:
      return statePart;
  }
}

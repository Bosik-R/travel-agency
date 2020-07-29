/* SELECTORS */

export const getAllRegions = ({regions}) => regions;
export const getRegion = ({regions}, regionCode) => regions[regionCode];

/* ACTIONS */


//action name creator
const reducerName = 'regions';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const GET_REGION = createActionName('GET_REGION');

// action creators
export const createActionGetRegion = payload => ({
  payload: {...payload},
  type: GET_REGION,
});

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}


const SET_LEVEL = 'level/SET_LEVEL';

export const INITIAL_STATE = {
  details: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};

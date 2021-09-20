const LIST_PRINCING = 'princing/LIST_PRINCING';

export const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_PRINCING:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

const LIST_FRIEND = 'friend/LIST_FRIEND';

export const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_FRIEND:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

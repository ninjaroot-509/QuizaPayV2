const LIST_USER = 'userlist/LIST_USER';

export const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_USER:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

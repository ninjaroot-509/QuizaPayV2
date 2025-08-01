const LIST_FRIENDREQUEST = 'friendrequest/LIST_FRIENDREQUEST';

export const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_FRIENDREQUEST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

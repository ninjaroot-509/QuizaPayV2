const LIST_RESULTAT = 'wallet/LIST_RESULTAT';

export const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_RESULTAT:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

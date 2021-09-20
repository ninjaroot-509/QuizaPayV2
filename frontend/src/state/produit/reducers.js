const LIST_PRODUIT = 'produit/LIST_PRODUIT';

export const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_PRODUIT:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

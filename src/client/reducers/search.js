const initialSearchState = {
    input: '',
  };
  
  const search = (state = initialSearchState, action) => {
    switch (action.type) {
      case 'SEARCH_INPUT_CHANGED': {
        return { ...state, input: action.data };
      }
      default: {
        return state;
      }
    }
  };

  export default search;
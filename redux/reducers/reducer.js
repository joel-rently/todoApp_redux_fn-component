import {CREATE_TODO, CHECKED_TODO, REMOVE_TODO} from '../actions/actionTypes';

const initialState = {todos: []};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {text: action.todoText, check: false, id: action.id},
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(item => action.id !== item.id),
      };
    case CHECKED_TODO:
      return {
        ...state,
        todos: state.todos.map(item =>
          item.id === action.id ? {...item, check: !item.check} : item,
        ),
      };

    default:
      return state;
  }
};
export default reducer;

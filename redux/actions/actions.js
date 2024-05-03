import { CREATE_TODO, CHECKED_TODO, REMOVE_TODO } from './actionTypes';

let count = 0;
export const addTodo = todoText => {
  return {
    type: CREATE_TODO,
    todoText,
    id: ++count,
  };
};

export const dltTodo = id => {
  return {
    type: REMOVE_TODO,
    id,
  };
};

export const checked = id => {
  return {
    type: CHECKED_TODO,
    id,
  };
};

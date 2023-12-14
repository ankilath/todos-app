import { useReducer } from 'react';
import { TodoList, TodoListAction } from './types';
import { v4 as uuidv4 } from 'uuid';

const reducer = (state: TodoList, action: TodoListAction) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          title: action.title,
          id: uuidv4(),
          done: false,
          created_at: new Date(),
        },
      ];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.id);
    case 'TOGGLE':
      return state.map((item) =>
        item.id === action.id
          ? { ...item, done: !item.done, completed_at: new Date() }
          : item
      );
    case 'SORT_ACTIVE_TODOS_LIST':
      const activeTodos = [...state].filter((item) => !item.done);
      const completedTodos = [...state].filter((item) => item.done);
      activeTodos.sort(
        (objA, objB) =>
          Number(new Date(objB.created_at)) - Number(new Date(objA.created_at))
      );
      return [...activeTodos, ...completedTodos];
    case 'SORT_COMPLETED_TODOS_LIST':
      const notCompletedTodos = [...state].filter((item) => !item.done);
      const finishedTodos = [...state].filter((item) => item.done);
      finishedTodos.sort(
        (objA, objB) =>
          Number(new Date(objA.completed_at)) -
          Number(new Date(objB.completed_at))
      );
      return [...notCompletedTodos, ...finishedTodos];
  }
};

/**
 * This is the initial todo state.
 * Instead of loading this data on every reload,
 * we should save the todo state to local storage,
 * and restore on page load. This will give us
 * persistent storage.
 */
const initialData: TodoList = [
  {
    id: uuidv4(),
    title: 'Complete assignment',
    done: false,
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Run for groceries',
    done: false,
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Get watch fixed',
    done: false,
    created_at: new Date('Dec 24 2023 10:00:00 AM'),
  },
];

export const useTodoList = (): [
  TodoList,
  {
    addTodo: (title: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    sortActiveTodosList: (todoList: TodoList) => void;
    sortCompletedTodosList: (todoList: TodoList) => void;
  }
] => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const addTodo = (title: string) => {
    dispatch({ type: 'ADD', title });
  };
  const deleteTodo = (id: string) => {
    dispatch({ type: 'REMOVE', id });
  };
  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE', id });
  };
  const sortActiveTodosList = (activeTodosList: TodoList) => {
    dispatch({ type: 'SORT_ACTIVE_TODOS_LIST', activeTodosList });
  };
  const sortCompletedTodosList = (completedTodosList: TodoList) => {
    dispatch({ type: 'SORT_COMPLETED_TODOS_LIST', completedTodosList });
  };

  return [
    state,
    {
      addTodo,
      deleteTodo,
      toggleTodo,
      sortActiveTodosList,
      sortCompletedTodosList,
    },
  ];
};

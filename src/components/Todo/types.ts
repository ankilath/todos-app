export type TodoList = {
  id: string;
  title: string;
  done: boolean;
  created_at: Date;
  completed_at?: Date;
}[];

export type TodoListAction =
  | { type: 'ADD'; title: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'SORT_ACTIVE_TODOS_LIST'; activeTodosList: TodoList }
  | { type: 'SORT_COMPLETED_TODOS_LIST'; completedTodosList: TodoList };

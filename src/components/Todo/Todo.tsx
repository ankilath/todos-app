import { useTodoList } from './hooks';
import { TodoItem } from './TodoItem';
import { TextInputForm } from '../TextInputForm/TextInputForm';
type Params = {
  title: string;
};

export const Todo = ({ title }: Params) => {
  const [
    list,
    {
      addTodo,
      deleteTodo,
      toggleTodo,
      sortActiveTodosList,
      sortCompletedTodosList,
    },
  ] = useTodoList();

  const getCompletedTodosCount = () => {
    return list.filter((todo) => todo.done).length > 0;
  };

  const getActiveTodosCount = () => {
    return list.filter((todo) => !todo.done).length > 0;
  }

  return (
    <>
      <h1>{title}</h1>
      {list.length === 0 ? (
        <p>{'Your list is empty, try adding a task'}</p>
      ) : (
        <div>
          {getActiveTodosCount() && <div>
            <label>Active Todos:</label>{' '}
            <span
              className="sortActionText"
              onClick={() => sortActiveTodosList(list)}
            >
              sort
            </span>
          </div>}
          <ul>
            {list
              .filter((todo) => !todo.done)
              .map(({ title, id, done }) => (
                <TodoItem
                  key={id}
                  title={title}
                  done={done}
                  toggle={() => toggleTodo(id)}
                  remove={() => deleteTodo(id)}
                />
              ))}
          </ul>
        </div>
      )}
      <div>
        {getCompletedTodosCount() && (
          <div>
            <label>Completed Todos:</label>
            <span
              className="sortActionText"
              onClick={() => sortCompletedTodosList(list)}
            >
              sort
            </span>{' '}
          </div>
        )}
        <ul>
          {list
            .filter((todo) => todo.done)
            .map(({ title, id, done }) => (
              <TodoItem
                key={id}
                title={title}
                done={done}
                toggle={() => toggleTodo(id)}
                remove={() => deleteTodo(id)}
              />
            ))}
        </ul>
      </div>
      <TextInputForm add={addTodo} />
    </>
  );
};

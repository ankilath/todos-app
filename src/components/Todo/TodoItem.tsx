type Params = {
  title: string;
  done: boolean;
  toggle: () => void;
  remove: () => void;
};

export const TodoItem = ({
  title,
  done,
  toggle,
  remove,
}: Params) => {
  return (
    <li>
      <div className="todoItem">
        <label>
          <input type="checkbox" checked={done} onChange={toggle} />
          <span>{title}</span>
        </label>
        <button className="todoItem-remove" onClick={remove}>
          X
        </button>
      </div>
    </li>
  );
};

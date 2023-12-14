type Params = {
  title: string;
  done: boolean;
  toggle: () => void;
  remove: () => void;
  created_at: Date;
  completed_at?: Date;
};

export const TodoItem = ({
  title,
  done,
  toggle,
  remove,
  created_at,
  completed_at,
}: Params) => {
  return (
    <li>
      <div className="todoItem">
        <label>
          <input type="checkbox" checked={done} onChange={toggle} />
          <span>{title}</span>
        </label>
        {/* <span style={{ color: 'blue' }}>{created_at}</span> */}
        <button className="todoItem-remove" onClick={remove}>
          X
        </button>
      </div>
    </li>
  );
};

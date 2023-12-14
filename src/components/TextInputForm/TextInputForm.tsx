import { useState, SyntheticEvent } from 'react';

type Params = {
  add: (title: string) => void;
};

export const TextInputForm = ({ add }: Params) => {
  const [value, setValue] = useState('');
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    add(value);
    setValue('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <button type="submit" disabled={value.trim().length === 0}>
        Add
      </button>
    </form>
  );
};

import { FC } from 'react';

import './style.css';
import { Todo } from './components/Todo/Todo';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div className="App">
      <Todo title="My favourite list" />
    </div>
  );
};

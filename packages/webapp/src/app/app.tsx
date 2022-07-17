import { useTasks } from '@nx-react-shared-components/data-access';
import { useCallback, useRef } from 'react';

export function App() {
  const textInputRef = useRef<HTMLInputElement>(null);
  const { addTask, removeTask, tasks, getTasks } =  useTasks();

  const onAddTask = useCallback(async () => {
    if (!textInputRef.current) return;

    await addTask(textInputRef.current.value);
    textInputRef.current.value = '';
  }, [addTask]);

  return (
    <>
      <h1>My tasks</h1>
      <ul>
        {
          tasks.map(task => <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)} >Remove</button>
          </li>)
        }
      </ul>
      <div>
        <input ref={textInputRef} />
        <button onClick={onAddTask}>Add</button>
      </div>
    </>
  );
}

export default App;

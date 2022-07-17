import { Tasks } from '@nx-react-shared-components/shared-types';
import axios from 'axios';
import { useEffect, useState, useCallback, useRef } from 'react';

export function App() {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const getTasks = useCallback(async () => {
    const resp = await axios.get<Tasks[]>('http://localhost:3333/api');
    setTasks(resp.data);
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const onAddTask = useCallback(async () => {
    if (!textInputRef.current) return;
    await axios.post('http://localhost:3333/api', {
      text: textInputRef.current?.value
    });

    textInputRef.current.value = '';
    getTasks();
  }, [getTasks]);

  const onRemoveTask = useCallback(async (id: number) => {
    await axios.post('http://localhost:3333/api/removeTask', {
      id,
    });
    
    getTasks();
  }, [getTasks]);

  return (
    <>
      <h1>My tasks</h1>
      <ul>
        {
          tasks.map(task => <li key={task.id}>
            {task.text}
            <button onClick={() => onRemoveTask(task.id)} >Remove</button>
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

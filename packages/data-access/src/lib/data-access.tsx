import { Tasks } from '@nx-react-shared-components/shared-types';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

const defaultEndpoint = 'http://localhost:3333/api';

export function useTasks(endpoint: string = defaultEndpoint) {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const getTasks = useCallback(async () => {
    try {
      const resp = await axios.get<Tasks[]>(endpoint);
      console.log('resp', resp.data)
      setTasks(resp.data);
    } catch (error) {
      console.error('error', error)
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const addTask = useCallback(async (text: string) => {
    await axios.post(endpoint, {
      text,
    });

    getTasks();
  }, [getTasks]);

  const removeTask = useCallback(async (id: number) => {
    await axios.post(`${endpoint}/removeTask`, {
      id,
    });
    
    getTasks();
  }, [getTasks]);

  return { tasks, getTasks, addTask, removeTask };
}

export default useTasks;

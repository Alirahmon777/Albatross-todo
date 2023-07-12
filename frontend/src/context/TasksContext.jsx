import { createContext, useState } from 'react';

export const TasksContext = createContext();

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(0);

  return (
    <TasksContext.Provider value={{ setTasks, tasks, setActive, active }}>
      {children}
    </TasksContext.Provider>
  );
}

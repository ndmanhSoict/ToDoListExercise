import { useEffect, useState } from 'react';
import type { Task } from '../type/TypeTask';
import TaskComponent from './TaskComponent';

export default function ColumnTask({ header, count }: { header: string; count: number }) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  useEffect(() => {
    setTaskList([
      {
        id: '1',
        title: 'Test Task',
        description: 'This is a test task',
        status: 'IN_PROGRESS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Test Task2',
        description: 'This is a test task',
        status: 'IN_PROGRESS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, []);
  return (
    <div className="flex flex-col w-68 bg-white shadow m-4 rounded p-1">
      <h2 className="font-bold text-lg mb-2">{header}</h2>
      <p className="text-sm text-gray-500 mb-4">{count} tasks</p>
      {taskList.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
      <button
        className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() =>
          setTaskList([
            ...taskList,
            {
              id: String(taskList.length + 1),
              title: `Test Task ${taskList.length + 1}`,
              description: 'This is a test task',
              status: 'IN_PROGRESS',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ])
        }
      >
        + Add Task
      </button>
    </div>
  );
}

import { useState } from 'react';
import type { Task } from '../type/TypeTask';
import TaskComponent from './TaskComponent';
import type { TaskStatus } from '../type/TypeTask';

export default function ColumnTask({
  header,
  count,
  proptaskList,
  onDropEvent,
}: {
  header: TaskStatus;
  count: number;
  proptaskList: Task[];
  onDropEvent: (taskId: string, fromColumn: TaskStatus, toColumn: TaskStatus) => void;
}) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('id');
        const fromColumn = e.dataTransfer.getData('fromColumn') as TaskStatus;
        console.log('Đã thả phần tử:', data, 'từ cột', fromColumn, 'vào cột', header);
        onDropEvent(data, fromColumn, header);
      }}
      className="flex flex-col w-68 bg-white shadow m-4 rounded p-1 h-fit"
    >
      <h2 className="font-bold text-lg mb-2">{header}</h2>
      <p className="text-sm text-gray-500 mb-4">{count} tasks</p>
      {proptaskList.map((task) => (
        <TaskComponent key={String(task.id)} task={task} fromColumn={header} />
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

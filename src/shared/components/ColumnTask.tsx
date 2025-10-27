import { useState } from 'react';
import type { Task } from '@type/TypeTask';
import TaskComponent from './TaskComponent';
import type { TaskStatus } from '@type/TypeTask';
import ModalAddTask from './ModalAddNewTask';

export default function ColumnTask({
  header,
  count,
  proptaskList,
  // onDropEvent,
}: {
  header: TaskStatus;
  count: number;
  proptaskList: Task[];
  // onDropEvent: (taskId: string, fromColumn: TaskStatus, toColumn: TaskStatus) => void;
}) {
  const [taskList] = useState<Task[]>([]);
  const list = [...proptaskList, ...taskList];
  const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  function CloseModal() {
    setOpenModalAddNewTask(false);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('id');
        const fromColumn = e.dataTransfer.getData('fromColumn') as TaskStatus;
        console.log('Đã thả phần tử:', data, 'từ cột', fromColumn, 'vào cột', header);
        // onDropEvent(data, fromColumn, header);
      }}
      className="flex flex-col flex-shrink-0 w-64 bg-white shadow m-4 rounded p-1 h-fit"
    >
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="font-bold text-lg">{header}</h2>
        <p className="text-sm text-gray-500">{count} tasks</p>
      </div>
      {list.map((task) => (
        <TaskComponent key={task.id} task={task} fromColumn={header} />
      ))}
      {header == 'TODO' ? (
        <button
          className=" text-black/65 py-2 px-4 rounded hover:bg-gray-400/25 w-1/2 self-end"
          onClick={() => setOpenModalAddNewTask(!openModalAddNewTask)}
        >
          + Add Task
        </button>
      ) : null}
      {openModalAddNewTask && <ModalAddTask status={header} propCloseModal={CloseModal} />}
    </div>
  );
}

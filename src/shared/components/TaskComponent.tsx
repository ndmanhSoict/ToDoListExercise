import { useState } from 'react';
import type { Task } from '@type/TypeTask';
import ModalTaskDetail from './ModalTaskDetail';
import { TaskContext } from '@shared/context/TaskContext';

export default function TaskComponent({ task }: { task: Task }) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  function handleOpenCloseModal(): void {
    setOpenModalDetail(!openModalDetail);
  }
  return (
    <TaskContext.Provider value={{ handleOpenCloseModal }}>
      <div
        className="border p-2 mb-4 rounded bg-white shadow w-48 block mx-auto"
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData('task', JSON.stringify(task));
        }}
        onClick={() => handleOpenCloseModal()}
      >
        <h2 className="text-base font-bold break-words whitespace-normal">{task.name}</h2>
        {/* <p className="text-sm text-gray-500">Created at: {task.createdAt.toDateString()}</p>
      <p className="text-sm text-gray-500">Updated at: {task.updatedAt.toDateString()}</p> */}
      </div>
      {openModalDetail && <ModalTaskDetail task={task}></ModalTaskDetail>}
    </TaskContext.Provider>
  );
}
